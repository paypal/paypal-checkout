/* @flow */
/** @jsx node */

import type { FundingEligibilityType } from '@paypal/sdk-client/src';
import { FUNDING, ENV, type LocaleType } from '@paypal/sdk-constants/src';
import { node, html, type ElementNode } from 'jsx-pragmatic/src';
import { LOGO_COLOR, LOGO_CLASS } from '@paypal/sdk-logos/src';
import { noop, preventClickFocus, isBrowser, isElement } from 'belter/src';

import type { ContentType, Wallet, Experiment, WalletInstrument } from '../../types';
import { ATTRIBUTE, CLASS, BUTTON_COLOR, BUTTON_LABEL, BUTTON_NUMBER, TEXT_COLOR, BUTTON_FLOW } from '../../constants';
import { getFundingConfig } from '../../funding';

import type { ButtonStyle, Personalization, OnShippingChange } from './props';
import { Spinner } from './spinner';
import { MenuButton } from './menu-button';

type IndividualButtonProps = {|
    style : ButtonStyle,
    fundingSource : $Values<typeof FUNDING>,
    multiple : boolean,
    locale : LocaleType,
    onClick? : Function,
    env : $Values<typeof ENV>,
    wallet? : ?Wallet,
    fundingEligibility : FundingEligibilityType,
    onShippingChange : ?OnShippingChange,
    i : number,
    nonce : string,
    userIDToken : ?string,
    personalization : ?Personalization,
    content : ?ContentType,
    tagline : ?boolean,
    commit : boolean,
    experiment : Experiment,
    flow : $Values<typeof BUTTON_FLOW>,
    vault : boolean,
    merchantFundingSource : ?$Values<typeof FUNDING>,
    instrument : ?WalletInstrument
|};

export function Button({ fundingSource, style, multiple, locale, env, fundingEligibility, i, nonce, flow, vault,
    userIDToken, personalization, onClick = noop, content, tagline, commit, experiment, instrument } : IndividualButtonProps) : ElementNode {

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ fundingSource }`);
    }

    const colors = fundingConfig.colors;
    const secondaryColors = fundingConfig.secondaryColors || {};

    let {
        color = colors[0],
        period,
        label
    } = style;

    if (multiple && i > 0) {
        if (secondaryColors[color] && colors.indexOf(secondaryColors[color] !== -1)) {
            color = secondaryColors[color];
        } else if (colors.indexOf(secondaryColors[BUTTON_COLOR.DEFAULT]) !== -1) {
            color = secondaryColors[BUTTON_COLOR.DEFAULT];
        } else {
            color = colors[0];
        }
    }

    const { logoColors, textColors } = fundingConfig;

    const logoColor = logoColors[color] || logoColors[LOGO_COLOR.DEFAULT] || LOGO_COLOR.DEFAULT;
    const textColor = textColors[color] || textColors[TEXT_COLOR.DEFAULT] || TEXT_COLOR.DEFAULT;

    const { Label, WalletLabel, Logo, showWalletMenu } = fundingConfig;

    const clickHandler = (event, opts) => {
        event.preventDefault();
        event.stopPropagation();
        onClick(event, { fundingSource, ...opts });
    };

    const keypressHandler = (event : KeyboardEvent, opts) => {
        if (event.keyCode === 13 || event.keyCode === 32) {
            clickHandler(event, opts);
        }
    };

    const onButtonRender = el => {
        if (isBrowser() && isElement(el)) {
            preventClickFocus(el);
        }
    };

    const { layout, shape } = style;

    const logoNode = (
        <Logo
            label={ label }
            locale={ locale }
            logoColor={ logoColor }
            fundingEligibility={ fundingEligibility }
            onClick={ clickHandler }
            onKeyPress={ keypressHandler }
            nonce={ nonce }
            experiment={ experiment }
            env={ env }
        />
    );

    let labelNode = (
        <Label
            i={ i }
            logo={ logoNode }
            label={ label }
            nonce={ nonce }
            locale={ locale }
            logoColor={ logoColor }
            period={ period }
            layout={ layout }
            multiple={ multiple }
            fundingEligibility={ fundingEligibility }
            onClick={ clickHandler }
            onKeyPress={ keypressHandler }
            personalization={ personalization }
            tagline={ tagline }
            content={ content }
        />
    );

    let isWallet = false;

    if (
        WalletLabel &&
        flow === BUTTON_FLOW.PURCHASE &&
        (instrument || (__WEB__ && userIDToken && (fundingSource === FUNDING.PAYPAL || fundingSource === FUNDING.VENMO)))
    ) {
        labelNode = (
            <WalletLabel
                nonce={ nonce }
                logoColor={ logoColor }
                instrument={ instrument }
                locale={ locale }
                content={ content }
                commit={ commit }
                experiment={ experiment }
                vault={ vault }
                textColor={ textColor }
                fundingSource={ fundingSource }
            />
        );

        isWallet = true;
    }

    const shouldShowWalletMenu = isWallet && instrument && showWalletMenu({ instrument });
    
    const getLabelText = () => {
        if (typeof fundingConfig.labelText === 'function') {
            return fundingConfig.labelText({ content });
        }

        if (label !== BUTTON_LABEL.PAYPAL) {
            const str = labelNode.render(html());
            if (str.replace(/<img.*<\/img>/, '').length > 0) {
                return str.replace(/<span.*?>/, '')
                    .replace(/<\/span>/, '')
                    .replace(/<img.*<\/img>/, fundingSource);
            }
        }
        return (fundingConfig.labelText || fundingSource);
    };
        
    return (
        <div
            class={ [
                CLASS.BUTTON_ROW,
                `${ CLASS.NUMBER }-${ i }`,
                `${ CLASS.LAYOUT }-${ layout }`,
                `${ CLASS.SHAPE }-${ shape }`,
                `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
                `${ CLASS.ENV }-${ env }`,
                `${ CLASS.COLOR }-${ color }`,
                `${ CLASS.TEXT_COLOR }-${ textColor }`,
                `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }`,
                `${ isWallet ? CLASS.WALLET : '' }`,
                `${ shouldShowWalletMenu ? CLASS.WALLET_MENU : '' }`
            ].join(' ') }
        >
            <div
                role='button'
                { ...{
                    [ ATTRIBUTE.BUTTON ]:            true,
                    [ ATTRIBUTE.FUNDING_SOURCE ]:    fundingSource,
                    [ ATTRIBUTE.PAYMENT_METHOD_ID ]: instrument ? instrument.tokenID : null,
                    [ ATTRIBUTE.INSTRUMENT_ID ]:     instrument ? instrument.instrumentID : null,
                    [ ATTRIBUTE.INSTRUMENT_TYPE ]:   instrument ? instrument.type : null
                } }
                class={ [
                    CLASS.BUTTON,
                    `${ CLASS.NUMBER }-${ i }`,
                    `${ CLASS.LAYOUT }-${ layout }`,
                    `${ CLASS.SHAPE }-${ shape }`,
                    `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
                    `${ CLASS.ENV }-${ env }`,
                    `${ CLASS.COLOR }-${ color }`,
                    `${ CLASS.TEXT_COLOR }-${ textColor }`,
                    `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }`,
                    `${ isWallet ? CLASS.WALLET : '' }`
                ].join(' ') }
                onClick={ clickHandler }
                onRender={ onButtonRender }
                onKeyPress={ keypressHandler }
                tabindex='0'
                aria-label={ getLabelText() }>

                <div class={ CLASS.BUTTON_LABEL }>
                    { labelNode }
                </div>

                <Spinner />
            </div>

            { shouldShowWalletMenu ? <MenuButton textColor={ textColor } /> : null }
        </div>
    );
}
