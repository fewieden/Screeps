/**
 * Screeps
 *
 * Role: Trump
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

const settings = require('module.settings');

module.exports = {

    /**
     * Finds closest wall between fewest life and buffer and repairs it.
     *
     * @param {Creep} creep
     * @return {boolean}
     */
    exec(creep) {
        let walls = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_WALL
        });

        const min = walls.reduce((min, wall) => {
            return min < wall.hits ? min : wall.hits;
        });

        const wall = creep.pos.findClosestByPath(walls, {
            filter: (s) => s.hits <= min + settings.roles.trump.buffer
        });

        if (wall !== null) {
            if (creep.repair(wall) === ERR_NOT_IN_RANGE) {
                creep.moveTo(wall);
            }
            return true;
        }

        return false;
    }
};