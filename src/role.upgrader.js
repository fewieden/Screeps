/**
 * Screeps
 *
 * Role: Upgrader
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

module.exports = {

    /**
     * Upgrades room controller.
     *
     * @param {Creep} creep
     * @return {boolean}
     */
    exec(creep) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
        return true;
    }
};