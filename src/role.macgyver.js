/**
 * Screeps
 *
 * Role: Mac Gyver
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

module.exports = {

    /**
     * Finds closest construction site and builds it up.
     *
     * @param {Creep} creep
     * @return {boolean}
     */
    exec(creep) {
        const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

        if (constructionSite !== null) {
            if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite);
            }
            return true;
        }

        return false;
    }
};