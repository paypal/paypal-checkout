/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';

import { ENV } from '../constants';
import { getBrowserLocale } from '../lib';
import { config } from '../config';

import { containerTemplate } from './template';

type BillingOptions = {
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    env? : string,
    locale? : string,
    logLevel : string,
    awaitPopupBridge : Function,
    meta : Object,
    commit : boolean
};

export const BillingPage : Component<BillingOptions> = create({
    tag:  'billing-page',
    name: 'billing-page',

    buildUrl(props) : string {
        let env = props.env || config.env;
        let { lang, country } = config.locale || getBrowserLocale();
        const locale = `${ lang }_${ country }`;
        let isCommit = props.commit ? 1 : 0;

        return `${ config.inlinedCardFieldUrls[env] }/billing?locale.x=${ locale }&commit=${ isCommit }`;
    },

    get domain() : Object {
        return {
            ...config.paypalDomains,
            [ ENV.LOCAL ]: /^http:\/\/localhost.paypal.com:\d+$/
        };
    },

    get bridgeUrl() : Object {
        return config.metaFrameUrls;
    },

    get bridgeDomain() : Object {
        return config.paypalDomains;
    },

    props: {
        prefilledZipCode: {
            type:     'string',
            required: false
        },
    
        locale: {
            type:          'string',
            required:      false,
            queryParam:    'locale.x',
            allowDelegate: true,

            def() : string {
                let { lang, country } = getBrowserLocale();
                return `${ lang }_${ country }`;
            }
        }
    },

    on: {
        type:       'function',
        required:   false,
        sameDomain: true
    },

    dispatch: {
        type:       'object',
        required:   false,
        sameDomain: true
    },

    onCancel: {
        type:     'function',
        required: false,
        once:     true,
        noop:     true
    },

    containerTemplate
});