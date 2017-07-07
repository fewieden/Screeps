/**
 * Screeps
 *
 * Module: Defense
 *
 * By fewieden https://github.com/fewieden/Screeps
 *
 * MIT Licensed.
 */

module.exports = {

    /**
     * Check for each room, if there is an enemy inside. When at least
     * one enemy was found, let all towers in the room attack the enemies.
     */
    defend() {
        for(let room in Game.rooms) {
            const enemies = Game.rooms[room].find(FIND_HOSTILE_CREEPS);

            if(enemies.length > 0) {
                const towers = Game.rooms[room].find(FIND_MY_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_TOWER
                });

                towers.forEach((t) => t.defend());
            }
        }
    }
};