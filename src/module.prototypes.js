/**
 * Screeps
 *
 * Module: Prototypes
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

/**
 * While getting energy creeps look for a filled container,
 * before they fill themselves at a source directly.
 *
 * @prototype
 */
Creep.prototype.getEnergy = function() {
    const container = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
    });

    if (container !== null) {
        if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(container);
        }
        return;
    }

    const source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if(this.harvest(source) === ERR_NOT_IN_RANGE) {
        this.moveTo(source);
    }
};

/**
 * In defense mode attack closest enemy, as it deals more damage
 * the closer the enemy is.
 *
 * @prototype
 */
StructureTower.prototype.defend = function() {
    const enemy = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if(enemy !== null) {
        this.attack(enemy);
    }
};