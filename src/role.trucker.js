/**
 * Screeps
 *
 * Role: Trucker
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

module.exports = {

    /**
     * Finds most filled container and transports the energy to the storage.
     *
     * @param {Creep} creep
     * @return {boolean}
     */
    exec(creep) {
        if(creep.carry.energy === creep.carryCapacity) {
            if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage);
            }
            return true;
        } else {
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
            });

            if (containers.length > 0) {
                const container = containers.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY])[0];

                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
                return true;
            }
        }
        return false;
    }
};