const { v4: uuidv4 } = require('uuid')

class utils{
    generateUuid() {
        return uuidv4();
    }
}

module.exports = new utils();