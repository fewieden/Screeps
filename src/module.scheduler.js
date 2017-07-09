/**
 * Screeps
 *
 * Module: Scheduler
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

const settings = require('module.settings');

const roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    macgyver: require('role.macgyver'),
    trump: require('role.trump'),
    mechanic: require('role.mechanic'),
    containerMiner: require('role.containerMiner'),
    trucker: require('role.trucker')
};

const requireNoDefaultEnergy = [
    'containerMiner',
    'trucker'
];

/**
 * Looks for an executable fallback task of the creeps role
 * and set it in memory.
 *
 * @param {Creep} creep
 */
const getFallbackTask = (creep) => {
    for(let fallback of settings.roles[creep.memory.role].fallback) {
        if(roles[fallback].exec(creep)){
            creep.memory.current = fallback;
            console.log(`${creep.name} is performing as ${fallback}`);
            break;
        }
    }
};

module.exports = {
    /**
     * Execute a task or harvest for each creep based on their state.
     */
    handle() {
        for(let name in Game.creeps) {
            const creep = Game.creeps[name];
            const role = creep.memory.role;

            if (creep.memory.isBusy && creep.carry.energy === 0 && !requireNoDefaultEnergy.includes(creep.memory.role)){
                creep.memory.isBusy = false;
            } else if (!creep.memory.isBusy && creep.carry.energy === creep.carryCapacity) {
                creep.memory.isBusy = true;
                creep.memory.current = role;
            }

            if(creep.memory.isBusy) {
                if(!roles[creep.memory.current].exec(creep)){
                    getFallbackTask(creep);
                }
            } else {
                creep.getEnergy();
            }
        }
    }
};