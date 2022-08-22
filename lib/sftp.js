const fs = require('fs');
const p = require('path');
let Client = require('ssh2-sftp-client');
const {constants, helpers, log} = require('utils-nxg-cg');
const {objectSFTPOpt, objectSFTPReq} = require('./objects');

let sftp = new Client();

/**
 * Method that process sftp operations
 * @param msg
 * @param cfg
 * @param test
 * @returns {Promise<unknown>}
 */
const process = async (msg, cfg, test = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            log.info('Inside sftp lib');
            //log.debug('Msg=', JSON.stringify(msg));
            log.debug('Config=', JSON.stringify(cfg));

            const {data} = msg;

            let properties = {...objectSFTPReq};
            let extraProp = {...objectSFTPOpt};

            if (!test && !data) {
                throw Error(`${constants.ERROR_PROPERTY} data`);
            }
            const valid = await helpers.validProperties(properties, data, cfg);

            if (valid) {
                await helpers.validProperties(extraProp, data, cfg, true);
                properties = {...properties, ...extraProp};

                let connSettings = {
                    host: properties.host,
                    port: properties.port,
                    username: properties.username,
                };
                if (properties.key)
                    connSettings.privateKey = fs.readFileSync(properties.key, 'utf8')
                else
                    connSettings.password = properties.password;

                let encoding = 'base64';
                if (properties.encoding) encoding = properties.encoding;
                properties.flag = properties.flag.toUpperCase();

                const validProp = await validProperties(properties);
                if (validProp) {
                    const result = await sftp.connect(connSettings)
                        .then(() => {
                            switch (properties.flag) {
                                case 'CREATEDIRECTORY':
                                    return sftp.mkdir(p.join(properties.path, properties.nameDirectory), true);
                                case 'DELETEDIRECTORY':
                                    return sftp.rmdir(p.join(properties.path, properties.nameDirectory), true);
                                case 'DELETEFILE':
                                    return sftp.delete(p.join(properties.path, properties.file));
                                case 'DOWNLOADIRECTORY':
                                    return (sftp.downloadDir(properties.path, properties.nameDirectory, undefined));//.to.eventually.equal(`${pathReq} downloaded to ${localDirectoryReq}`);
                                case 'GETFILE':
                                    return sftp.get(p.join(properties.path, properties.file), undefined).then(r => {
                                        return {filename: properties.file, content: r.toString(encoding)};
                                    });
                                case 'GETLISTFILES':
                                    return sftp.list(properties.path);
                                case 'RENAMEFILE':
                                    return sftp.rename(p.join(properties.path, properties.file), p.join(properties.path, properties.nameNewFile));
                                case 'SAVEFILE':
                                    return sftp.put(Buffer.from(properties.content, encoding), p.join(properties.path, properties.file));
                                case 'UPLOADIRECTORY':
                                    return (sftp.uploadDir(properties.nameDirectory, properties.path, undefined));
                                default:
                                    return reject(`Option ${properties.flag} not exists`);
                            }
                        });
                    log.info(constants.FINISH_EXEC);
                    resolve(result);
                }
            }
        } catch (e) {
            log.error(e.toString());
            reject(e.toString());
        } finally {
            await sftp.end();
        }
    });
};

/**
 * Method for valid properties
 * Custom validations for each process
 * @param properties
 * @returns {Promise<unknown>}
 */
const validProperties = async (properties) => {
    return new Promise((resolve, reject) => {
        switch (properties.flag) {
            case 'DELETEFILE':
            case 'GETFILE':
                if (!properties.file)
                    reject(`${constants.ERROR_PROPERTY} file`);
                break;
            case 'SAVEFILE':
                if (!properties.content || !properties.file)
                    reject(`${constants.ERROR_PROPERTY} content and file`);
                break;
            case 'RENAMEFILE':
                if (!properties.nameNewFile || !properties.file)
                    reject(`${constants.ERROR_PROPERTY} file and nameNewFile`);
                break;
            case 'CREATEDIRECTORY':
            case 'DELETEDIRECTORY':
            case 'DOWNLOADIRECTORY':
            case 'UPLOADIRECTORY':
                if (!properties.nameDirectory)
                    reject(`${constants.ERROR_PROPERTY} nameDirectory`);
                break;
        }
        resolve(true);
    });

};

module.exports = {
    sftp: process
};