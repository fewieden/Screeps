/**
 * Screeps
 *
 * Module: Spawner
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

const settings = require('module.settings');

const Spawn = Game.spawns.Base;

/**
 * Counts creeps that are alive of specific role.
 *
 * @param {String} role
 * @returns {Number}
 */
const creepsAlive = (role) => {
    let creeps = Object.keys(Game.creeps);

    creeps = creeps.filter((name) => Game.creeps[name].memory.role === role);

    return creeps.length;
};

module.exports = {

    /**
     * Checks for roles sorted by priority, if they have less creeps alive as their limit
     * specified in the settings and if they have a spawnRule that applies. Then it tries to spawn a new creep.
     */
    spawnCreeps() {
        let roles = Object.keys(settings.roles);

        roles = roles.sort((a, b) => settings.roles[b].priority - settings.roles[a].priority);

        for(let role of roles) {
            if(creepsAlive(role) < settings.roles[role].max &&
                (!settings.roles[role].hasOwnProperty('spawnRule') || settings.roles[role].spawnRule(Spawn))){

                console.log(`Try to spawn creep of role ${role}`);

                const name = Spawn.createCreep(settings.roles[role].body, undefined, {
                    role,
                    current: role,
                    isBusy: false
                });

                if(typeof name === 'string'){
                    console.log(`Creep ${name} with role ${role} spawned`);
                } else {
                    console.log(`Spawning failed with code ${name}`);
                }
                break;
            }
        }
    }
};