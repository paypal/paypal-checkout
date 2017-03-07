/* @flow */

import postRobot from 'post-robot/src';
import $logger from 'beaver-logger/client';
import { config } from '../config';

type LoggerOptions = {
    loggerPrefix? : string
};

export function initLogger(options : LoggerOptions) {

    $logger.addPayloadBuilder(() => {
        return {
            host: window.location.host,
            path: window.location.pathname,
            env: config.env,
            country: config.locale.country,
            lang: config.locale.lang,
            uid: window.pp_uid,
            ver: __MINOR_VERSION__
        };
    });

    $logger.addMetaBuilder(() => {
        return {
            state: config.state
        };
    });

    $logger.init({
        uri: config.loggerUrl,
        heartbeat: false,
        logPerformance: false,
        prefix: options.logPrefix || `ppxo`
    });
}

export function setLogLevel(logLevel : string) {

    if ($logger.logLevels.indexOf(logLevel) === -1) {
        throw new Error(`Invalid logLevel: ${logLevel}`);
    }

    config.logLevel = logLevel;
    $logger.config.logLevel = logLevel;
    postRobot.CONFIG.LOG_LEVEL = logLevel;
    window.LOG_LEVEL = logLevel;
}


