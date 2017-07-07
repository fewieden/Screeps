/**
 * Screeps
 *
 * Module: Settings
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

module.exports = {
    spawnTicks: 5,
    roles: {
        harvester: {
            body: [WORK, WORK, CARRY, MOVE, MOVE],
            max: 2,
            priority: 3,
            fallback: ['upgrader']
        },

        containerMiner: {
            body: [WORK, WORK, WORK, WORK, WORK, MOVE],
            max: 2,
            priority: 3,
            fallback: []
        },

        mechanic: {
            body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
            max: 1,
            priority: 2,
            fallback: ['macgyver', 'upgrader'],
            /**
             * Only spawn a mechanic, if there is a structure other than a wall,
             * which has less or equal 60% life.
             *
             * @param {StructureSpawn} spawn
             * @returns {boolean}
             */
            spawnRule: (spawn) => {
                const damagedStructures = spawn.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType !== STRUCTURE_WALL && s.hits / s.hitsMax <= 0.6
                });

                return damagedStructures.length > 0;
            }
        },

        macgyver: {
            body: [WORK, WORK, CARRY, MOVE, MOVE],
            max: 1,
            priority: 2,
            fallback: ['harvester', 'upgrader'],
            /**
             * Only spawn a macgyver, if there is a construction site.
             *
             * @param {StructureSpawn} spawn
             * @returns {boolean}
             */
            spawnRule: (spawn) => {
                const constructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES);

                return constructionSites.length > 0;
            }
        },

        upgrader: {
            body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE],
            max: 3,
            priority: 1,
            fallback: []
        },

        trump: {
            body: [WORK, WORK, CARRY, MOVE, MOVE],
            max: 1,
            priority: 0,
            fallback: ['harvester'],
            buffer: 100 * 12,
            /**
             * Only spawn a trump, if there is a wall,
             * which has less than 30k hits.
             *
             * @param {StructureSpawn} spawn
             * @returns {boolean}
             */
            spawnRule: (spawn) => {
                const walls = spawn.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_WALL && s.hits < 30 * 1000
                });

                return walls.length > 0;
            }
        }
    }
};