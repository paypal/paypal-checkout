/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create  } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { config } from '../config';
import { getBrowserLocale } from '../lib';

type CardOptions = {
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    env? : string,
    locale? : string,
    logLevel : string,
    awaitPopupBridge : Function,
    onAuthorize : ({ returnUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    onCancel? : ({ cancelUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    meta : Object,
    commit : boolean
};

export const Card : Component<CardOptions> = create({
    tag:  'card-fields',
    name: 'ppcard',

    buildUrl(props) : string {
        let env = props.env || config.env;
        let { lang, country } = config.locale || getBrowserLocale();
        const locale = `${ lang }_${ country }`;
        let isCommit = props.commit ? 1 : 0;

        return window.xprops.payment().then(paymentToken => {
            return `${ config.inlinedCardFieldUrls[env] }?token=${ paymentToken }&locale.x=${ locale }&commit=${ isCommit }`;
        });
    },

    contexts: {
        iframe: true,
        popup:  false
    },

    onAuthorize: {
        type:     'function',
        required: true,
        once:     true
    },

    onAuth: {
        type:       'function',
        required:   false,
        sameDomain: true
    },

    on: {
        type:       'function',
        required:   false,
        sameDomain: true
    },

    getState: {
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

    props: {
        initialFormValues: {
            type:     'object',
            required: false
        }
    }
});
