// Filters / Parameters
    // 1. Categories
        // groupToken - optional - number
        // limit - optional - number
        // offset - optional -number
        // orderBy - optional - String
    // 2. Episodes
        // groupToken - optional - number
        // guid [episode] - optional - String
        // guid [programme] - optional - String
        // limit - optional - number (default 50)
        // offset - optional - number (default 0)
        // orderBy - optional - number
    // 3. GroupToken
        // device - required - String
        // ipAddress - optional - String
        // gigyaId - optional - String
        // postcode - optional - String
    // 4. Programmes
        // groupToken - optional - number
        // limit - optional - number
        // offset - optional - number
        // orderBy - optional - String
    // 5. Promoted
        //groupToken - optional - number
        // limit - optional - number
        // offset - optional - number
        // orderBy - optional - String
    // 6. Schedule
        // limit - optional - number
        // offset - optional - number
        // orderBy - optional - String
    // 7. Series
        // limit - optional - number
        // offset - optional - number
        // orderBy - optional - String
        // groupToken - optional - number
        // guid [episode] - optional - String
        // guid [programme] - optional - String
    // 8. Streams
        // groupToken - optional - number
        // channel - optional - String
        // limit - optional - number
        // offset - optional - number
        // orderBy - optional - String
export default  {
        requestParameters : {},
        type : 'grouptoken',
        orderBy (value) {
            // type check
            try {
                this.isString(value);
                this.requestParameters.orderBy = value;
                return this;
            } catch (e) {
                throw new Error(e);
            }
        },
        offset (value) {
            // type check
            try{
                this.isNumber(value);
                this.requestParameters.offset = value;
                return this;
            } catch (e) {
                throw new Error(e);
            }
        },
        groupToken (value) {
            try {
                this.isNumber(value);
                // type check
                this.requestParameters.groupToken = value;
                return this;
            } catch (e) {
                throw new Error(e);
            }

        },
        episodeGuid (value) {
            try {
                this.isString(value);
                // type check
                this.requestParameters.guid = value;
                return this;
            } catch (e) {
                throw new Error(e);
            }
        },
        programmeGuid (value) {
            try {
                this.isString(value);
                // type check
                // TODO: API won't accept ajax embedded object programme%5Bguid%5D=mySecondGuid (programme["guid"]=myGuid)
                // will only accept programme.guid=myGuid - find a way of dealing with embedded objects
                this.requestParameters.programme = { guid : value };
                return this;
            } catch(e) {
                throw new Error(e);
            }
        },
        device (value) {
            try {
                this.isString(value);
                // type check
                this.requestParameters.device = value;
                return this;

            } catch (e) {
                throw new Error(e);
            }
        },
        ipAddress (value) {
            try {
                this.isNumber(value);
                // type check
                this.requestParameters.ipAddress = value;
                return this;
            } catch(e) {
                throw new Error(e);
            }
        },
        gigyaId (value) {
            try {
                this.isString(value);
                // type check
                this.requestParameters.gigyaId = value;
                return this;
            } catch(e) {
                throw new Error(e);
            }

        },
        startLetter (value) {
            try {
                this.isString(value);
                this.requestParameters.startLetter = value;
                return this;
            } catch(e) {
                throw new Error(e);
            }
        },
        postcode (value) {
            try {
                this.isString(value);
                // type check
                this.requestParameters.postcode = value;
                return this;
            } catch(e) {
                throw new Error(e);
            }
        },
        channel (value) {
            try {
                this.isString(value);
                // type checkcd
                this.requestParameters.channel = value;
                return this;
            } catch(e) {
                throw new Error(e);
            }

        },
        setType (requestType) {
            try {
                this.isString(requestType);
                this.type = requestType;
                return this;
            } catch(e) {
                throw new Error(e);
            }
        }
};
