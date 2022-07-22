export const Items: {[itemid: string]: ItemData} = {
	/*powerlink: {
		name: "Power Link",
		onChargeMove(target, move) {
			if (target.species.id === 'dodrio' || target.species.id === 'doduo') {
				this.add("-activate", target, "item: Power Link");
				this.debug('power link - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', target, move.name, target);
				return false; // skip charge turn
			}
		},
		onHit(target, source, move) {
				let damage = this.getDamage(target, source, move);
				this.damage(this.calcRecoilDamage(damage, move), source, target, 'recoil');
		},
		itemUser: ["Dodrio", "Doduo"],
		num: 1001,
		gen: 2,
		shortDesc: "If held by Doduo or Dodrio, causes its 2-turn moves to be executed in one turn.",
	},*/
	hellfirelantern: {
		name: "Hellfire Lantern",
		onSourceTryHit(target, source, move) {
			if (move.type === 'Fire') {
				target.trySetStatus('brn', source);
				source.useItem();
			}
		},
		itemUser: ["Houndoom", "Houndour"],
		num: 1002,
		gen: 2,
		shortDesc: "If held by Houndour or Houndoom, its first fire attack always burns the opponent. Single use.",
    },
	sandstone: {
		name: "Sandstone",
		onStart(target) {
			if (target.species.id === 'sandslash' || target.species.id === 'sandshrew') {
				this.add("-activate", target, "item: Sandstone");
				this.field.setWeather('sandstorm');
			}
		},
		itemUser: ["Sandslash", "Sandshrew"],
		num: 1003,
		gen: 2,
		shortDesc: "If held by Sandshrew and Sandslash, summon Sandstorm for 5 turns on switch-in.",
	},
	alarmclock: {
		name: "Alarm Clock",
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			this.add('-activate', source, 'item: Alarm Clock');
			return false;
		},
		num: 1004,
		gen: 2,
		shortDesc: "Prevents Sleep status from being applied to the holder.",
    },
	heatpack: {
		name: "Heat Pack",
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'frz') return;
			this.add('-activate', source, 'item: Heat Pack');
			return false;
		},
		num: 1005,
		gen: 2,
		shortDesc: "Prevents Freeze status from being applied to the holder.",
    },
	smellingsalts: {
		name: "Smelling Salts",
		onUpdate(pokemon) {
			if (pokemon.status === 'par') {
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'par') return;
			this.add('-activate', source, 'item: Smelling Salts');
			return false;
		},
		num: 1006,
		gen: 2,
		shortDesc: "Prevents Paralysis status from being applied to the holder.",
    },
	 ointment: {
		name: "Ointment",
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			this.add('-activate', source, 'item: Ointment');
			return false;
		},
		num: 1007,
		gen: 2,
		shortDesc: "Prevents Burn status from being applied to the holder.",
    },
	 airfilter: {
		name: "Air Filter",
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			this.add('-activate', source, 'item: Air Filter');
			return false;
		},
		num: 1008,
		gen: 2,
		shortDesc: "Prevents Poison status from being applied to the holder.",
    },
	 seviisap: {
		name: "Sevii Sap",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 24);
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source !== pokemon) || this.activeMove.id === 'thief') {
				this.add('-message', 'Sevii Sap cannot be removed.');
				return false;
			}
		},
		num: 1008,
		gen: 2,
		shortDesc: "At the end of every turn, holder restores 1/16 of its max HP. Cannot be removed.",
	},
	seviisundae: {
		name: "Sevii Sundae",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			/*if (pokemon.itemStateDuration === 10) {
				pokemon.useItem();
			}*/
		},
		condition: {
			duration: 10,
		},
		num: 1009,
		gen: 2,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	wynaut: {
        name: "Wynaut",
		  onStart(pokemon) {
			  if (pokemon.volatiles['substitute']) {
				  this.add('-item', pokemon, 'Wynaut')
				  return;
			  }
		  },
		  onAfterSubDamage(damage, pokemon, source, effect) {
		  	  this.debug('effect: ', + effect.id);
			  if (effect.effectType === 'Move') {
			  		this.add('-fail', pokemon, 'Wynaut')
				   return;
			  }
		  },
        onResidual(pokemon) {
            if (!pokemon.hp) return;
            for (const target of pokemon.side.foe.active) {
                if (!target || !target.hp) continue;
                if (pokemon.volatiles['substitute']) {
                    this.damage(target.baseMaxhp / 8, target, pokemon);
                }
            }
        },
        num: 1009,
        gen: 2,
        shortDesc: "If user is behind a Substitute and receives no damage, foe loses 1/8th Max HP.",
	},
	
	
	// Vanilla Edits
	
	metalpowder: {
		name: "Metal Powder",
		spritenum: 287,
		onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
						this.debug('Aurora Veil weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
				}
			},
		itemUser: ["Animon", "Ditto"],
		num: 257,
		gen: 2,
		shortDesc: "(Bugged) Not compatible with Animon."
	},
	
	
	/*reflect: {
		num: 115,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Reflect",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'reflect',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onResidualOrder: 21,
			onEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},*/
	/*metalpowder: {
		name: "Metal Powder",
		spritenum: 287,
		onModifyDef(def, pokemon) {
			if (pokemon.species.id === 'animon' || pokemon.species.id === 'ditto') {
				return this.chainModify(1.5);
			}	
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id === 'animon' || pokemon.species.id === 'ditto') {
				return this.chainModify(1.5);
			}	
		},
		itemUser: ["Animon", "Ditto"],
		num: 257,
		gen: 2,
	},*/
};
