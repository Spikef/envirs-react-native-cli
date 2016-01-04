#!/usr/bin/env node

'use strict';

/**
 * Usage: link native packages for app
 * Author: Spikef < Spikef@Foxmail.com >
 * Copyright: Envirs Team < http://envirs.com >
 */

var link = require('rnpm-plugin-link');

module.exports = function(name) {
    var config = require('rnpm/src/config');

    return link.func(config, [name]);
};