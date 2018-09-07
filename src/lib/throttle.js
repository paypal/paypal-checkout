/* @flow */

import { info, track, flush as flushLogs } from 'beaver-logger/client';
import { getDomain } from 'cross-domain-utils/src';

import { FPTI, COUNTRY } from '../constants';
import { config } from '../config';

import { match } from './util';
import { getStorageState, getStorageID, getSessionState } from './session';


function isCheckpointUnique(name : string) : boolean {
    return getSessionState(state => {
        state.loggedBeacons = state.loggedBeacons || [];

        if (state.loggedBeacons.indexOf(name) === -1) {
            state.loggedBeacons.push(name);
            return true;
        }

        return false;
    });
}

type Throttle = {
    isEnabled : () => boolean,
    isDisabled : () => boolean,
    getTreatment : () => string,
    log : (string, payload? : { [string] : ?string }) => Throttle,
    logStart : (payload? : { [string] : ?string }) => Throttle,
    logComplete : (payload? : { [string] : ?string }) => Throttle
};

function getThrottlePercentile(name : string) : number {
    return getStorageState(storage => {
        storage.throttlePercentiles = storage.throttlePercentiles || {};
        storage.throttlePercentiles[name] = storage.throttlePercentiles[name] || Math.floor(Math.random() * 100);
        return storage.throttlePercentiles[name];
    });
}

const THROTTLE_GROUP = {
    TEST:     'test',
    CONTROL:  'control',
    THROTTLE: 'throttle'
};

export function getThrottle(name : string, sample : number) : Throttle {

    let uid = getStorageID();

    let throttle = getThrottlePercentile(name);

    let group;

    if (throttle < sample) {
        group = THROTTLE_GROUP.TEST;
    } else if ((sample >= 50) || ((sample <= throttle) && (throttle < (sample * 2)))) {
        group = THROTTLE_GROUP.CONTROL;
    } else {
        group = THROTTLE_GROUP.THROTTLE;
    }

    let treatment = `${ name }_${ group }`;

    let started = false;
    let forced = false;

    try {
        if (window.localStorage && window.localStorage.getItem(name)) {
            forced = true;
        }
    } catch (err) {
        // pass
    }

    return {

        isEnabled() : boolean {
            return (group === THROTTLE_GROUP.TEST) || forced;
        },

        isDisabled() : boolean {
            return (group !== THROTTLE_GROUP.TEST) && !forced;
        },

        getTreatment() : string {
            return treatment;
        },

        log(checkpointName : string, payload? : { [string] : ?string } = {}) : Throttle {

            if (!started) {
                return this;
            }

            if (isCheckpointUnique(`${ name }_${ treatment }`)) {
                track({
                    [ FPTI.KEY.STATE ]:           FPTI.STATE.PXP,
                    [ FPTI.KEY.TRANSITION ]:      FPTI.TRANSITION.PXP,
                    [ FPTI.KEY.EXPERIMENT_NAME ]: name,
                    [ FPTI.KEY.TREATMENT_NAME ]:  treatment,
                    ...payload
                });
            }

            let event = `${ name }_${ treatment }_${ checkpointName }`;

            if (isCheckpointUnique(event)) {
                info(event, { ...payload, expuid: uid });
            }

            flushLogs();

            return this;
        },

        logStart(payload? : { [string] : ?string } = {}) : Throttle {
            started = true;
            return this.log(`start`, payload);
        },

        logComplete(payload? : { [string] : ?string } = {}) : Throttle {
            return this.log(`complete`, payload);
        }
    };
}

export function getReturnToken() : ?string {

    let token = match(window.location.href, /token=((EC-)?[A-Z0-9]+)/);
    let payer = match(window.location.href, /PayerID=([A-Z0-9]+)/);

    if (token && payer) {
        return token;
    }
}

type CustomThrottle = Throttle & {
    isActive : () => boolean
};

export function buildFundingLogoThrottle(props : Object) : CustomThrottle {

    let emptyThrottle = {
        isActive:     () => false,
        isEnabled:    () => false,
        isDisabled:   () => true,
        getTreatment: () => '',
        log:          () => emptyThrottle,
        logStart:     () => emptyThrottle,
        logComplete:  () => emptyThrottle
    };

    let { layout, label, locale, browserLocale } = props;

    if (browserLocale.country !== COUNTRY.US) {
        return emptyThrottle;
    }

    let localeString = locale;

    if (typeof locale === 'object') {
        localeString = `${ locale.lang }_${ locale.country }`;
    }

    if (localeString !== 'en_US') {
        return emptyThrottle;
    }

    if (label !== 'checkout' && label !== 'paypal' && label !== 'pay' && label !== 'buynow') {
        return emptyThrottle;
    }

    let domain = getDomain().replace(/^https?:\/\//, '').replace(/^www\./, '');
    if (config.bmlCreditTest.domains.indexOf(domain) === -1) {
        return emptyThrottle;
    }

    if (layout === undefined || (layout && layout === 'horizontal')) {
        return {
            ...getThrottle('ppc_rebrand', 50),
            isActive: () => true
        };
    }

    return emptyThrottle;

}
