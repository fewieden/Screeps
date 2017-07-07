/**
 * Screeps
 *
 * Role: Harvester
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

module.exports = {

    /**
     * Finds closest stucture that isn't filled completely with energy
     * and fills it up.
     *
     * @param {Creep} creep
     * @return {boolean}
     */
    exec(creep) {
        const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => s.energy < s.energyCapacity
        });

        if (structure !== null) {
            if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
            return true;
        }

        return false;
    }
};