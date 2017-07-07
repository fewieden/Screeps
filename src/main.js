/**
 * Screeps
 *
 * Module: Main
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

const settings = require('module.settings');
const memory = require('module.memory');
const defense = require('module.defense');
const spawner = require('module.spawner');
const scheduler = require('module.scheduler');

require('module.prototypes');

/**
 * This loop gets executed every tick.
 */
module.exports.loop = () => {
    memory.free();

    defense.defend();

    /**
     * Only check every 5 ticks (or whatever value is set in the settings),
     * if there should be a new creep be spawned.
     */
    if(Game.time % settings.spawnTicks === 0){
        spawner.spawnCreeps();
    }

    scheduler.handle();
};