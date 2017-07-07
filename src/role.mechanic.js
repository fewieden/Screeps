/**
 * Screeps
 *
 * Role: Mechanic
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

module.exports = {

    /**
     * Finds closest damaged structure, that isn't a wall and repairs it.
     *
     * @param {Creep} creep
     * @return {boolean}
     */
    exec(creep) {
        const damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
        });

        if (damagedStructure !== null) {
            if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
                creep.moveTo(damagedStructure);
            }
            return true;
        }

        return false;
    }
};