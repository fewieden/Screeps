/**
 * Screeps
 *
 * Role: Container Miner
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

module.exports = {

    /**
     * Farms a source and drops the energy in the container underneath.
     *
     * @param {Creep} creep
     * @return {boolean}
     */
    exec(creep) {
        if(!creep.memory.container || !creep.memory.source) {
            if(!this.findContainer(creep)) {
                creep.say(`Creep ${creep.name} can't find a container to mine!`);
            }
        }

        const container = Game.getObjectById(creep.memory.container);
        const source = Game.getObjectById(creep.memory.source);

        if (container !== null && source !== null) {
            if (creep.pos.isEqualTo(container.pos)) {
                creep.harvest(source)
            } else {
                creep.moveTo(container);
            }
            return true;
        }

        creep.say(`Creep ${creep.name} has an invalid container to mine!`);
        return false;
    },

    /**
     * Finds a container that isn't used by another Container Miner, which is placed
     * next to an energy source.
     *
     * @param {Creep} creep
     * @return {boolean}
     */
    findContainer(creep) {
        const blacklist = [];
        const containerMiners = creep.room.find(FIND_MY_CREEPS, {
            filter: (c) => c.memory.role === 'containerMiner' && c.memory.hasOwnProperty('container')
        });
        containerMiners.forEach((c) => blacklist.push(c.memory.container));

        const candidates = creep.room.find(FIND_SOURCES);

        for(let candidate of candidates) {
            const containers = candidate.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });
            for(let container of containers) {
                if(!blacklist.includes(container.id)) {
                    creep.memory.container = container.id;
                    creep.memory.source = candidate.id;
                    return true;
                }
            }
        }

        return false;
    }
};