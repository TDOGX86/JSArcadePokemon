let names = "Bulbasaur-Ivysaur-Venusaur-Charmander-Charmeleon-Charizard-Squirtle-Wartortle-Blastoise-Caterpie-Metapod-Butterfree-Weedle-Kakuna-Beedrill-Pidgey-Pidgeotto-Pidgeot-Rattata-Raticate-Spearow-Fearow-Ekans-Arbok-Pikachu-Raichu-Sandshrew-Sandslash-Nidoran♀-Nidorina-Nidoqueen-Nidoran♂-Nidorino-Nidoking-Clefairy-Clefable-Vulpix-Ninetales-Jigglypuff-Wigglytuff-Zubat-Golbat-Oddish-Gloom-Vileplume-Paras-Parasect-Venonat-Venomoth-Diglett-Dugtrio-Meowth-Persian-Psyduck-Golduck-Mankey-Primeape-Growlithe-Arcanine-Poliwag-Poliwhirl-Poliwrath-Abra-Kadabra-Alakazam-Machop-Machoke-Machamp-Bellsprout-Weepinbell-Victreebel-Tentacool-Tentacruel-Geodude-Graveler-Golem-Ponyta-Rapidash-Slowpoke-Slowbro-Magnemite-Magneton-Farfetch’d-Doduo-Dodrio-Seel-Dewgong-Grimer-Muk-Shellder-Cloyster-Gastly-Haunter-Gengar-Onix-Drowzee-Hypno-Krabby-Kingler-Voltorb-Electrode-Exeggcute-Exeggutor-Cubone-Marowak-Hitmonlee-Hitmonchan-Lickitung-Koffing-Weezing-Rhyhorn-Rhydon-Chansey-Tangela-Kangaskhan-Horsea-Seadra-Goldeen-Seaking-Staryu-Starmie-Mr. Mime-Scyther-Jynx-Electabuzz-Magmar-Pinsir-Tauros-Magikarp-Gyarados-Lapras-Ditto-Eevee-Vaporeon-Jolteon-Flareon-Porygon-Omanyte-Omastar-Kabuto-Kabutops-Aerodactyl-Snorlax-Articuno-Zapdos-Moltres-Dratini-Dragonair-Dragonite-Mewtwo-Mew".split(
  "-"
);
let helper = {
  name: names,
  attack: "49-62-82-52-64-84-48-63-83-30-20-45-35-25-90-45-60-80-56-81-60-90-60-95-55-90-75-100-47-62-92-57-72-102-45-70-41-76-45-70-45-80-50-65-80-70-95-55-65-55-100-45-70-52-82-80-105-70-110-50-65-95-20-35-50-80-100-130-75-90-105-40-70-80-95-120-85-100-65-75-35-60-90-85-110-45-70-80-105-65-95-35-50-65-45-48-73-105-130-30-50-40-95-50-80-120-105-55-65-90-85-130-5-55-95-40-65-67-92-45-75-45-110-50-83-95-125-100-10-125-85-48-55-65-65-130-60-40-60-80-115-105-110-85-90-100-64-84-134-110".split(
    "-"
  ),
  defense: "49-63-83-43-58-78-65-80-100-35-55-50-30-50-40-40-55-75-35-60-30-65-44-69-40-55-85-110-52-67-87-40-57-77-48-73-40-75-20-45-35-70-55-70-85-55-80-50-60-25-50-35-60-48-78-35-60-45-80-40-65-95-15-30-45-50-70-80-35-50-65-35-65-100-115-130-55-70-65-110-70-95-55-45-70-55-80-50-75-100-180-30-45-60-160-45-70-90-115-50-70-80-85-95-110-53-79-75-95-120-95-120-5-115-80-70-95-60-65-55-85-65-80-35-57-57-100-95-55-79-80-48-50-60-60-60-70-100-125-90-105-65-65-100-85-90-45-65-95-90".split(
    "-"
  ),
  hp: "45-60-80-39-58-78-44-59-79-45-50-60-40-45-65-40-63-83-30-55-40-65-35-60-35-60-50-75-55-70-90-46-61-81-70-95-38-73-115-140-40-75-45-60-75-35-60-60-70-10-35-40-65-50-80-40-65-55-90-40-65-90-25-40-55-70-80-90-50-65-80-40-80-40-55-80-50-65-90-95-25-50-52-35-60-65-90-80-105-30-50-30-45-60-35-60-85-30-55-40-60-60-95-50-60-50-50-90-40-65-80-105-250-65-105-30-55-45-80-30-60-40-70-65-65-65-65-75-20-95-130-48-55-130-65-65-65-35-70-30-60-80-160-90-90-90-41-61-91-106".split(
    "-"
  ),
  speed: "45-60-80-65-80-100-43-58-78-45-30-70-50-35-75-56-71-101-72-97-70-100-55-80-90-110-40-65-41-56-76-50-65-85-35-60-65-100-20-45-55-90-30-40-50-25-30-45-90-95-120-90-115-55-85-70-95-60-95-90-90-70-90-105-120-35-45-55-40-55-70-70-100-20-35-45-90-105-15-30-45-70-60-75-110-45-70-25-50-40-70-80-95-110-70-42-67-50-75-100-150-40-55-35-45-87-76-30-35-60-25-40-50-60-90-60-85-63-68-85-115-90-105-95-105-93-85-110-80-81-60-48-55-65-130-65-40-35-55-55-80-130-30-85-100-90-50-70-80-130".split(
    "-"
  ),
  spDefense: "65-80-100-50-65-85-64-80-105-20-25-80-20-25-80-35-50-70-35-70-31-61-54-79-50-80-30-55-40-55-85-40-55-75-65-90-65-100-25-50-40-75-65-75-90-55-80-55-75-45-70-40-65-50-80-45-70-50-80-40-50-90-55-70-95-35-60-85-30-45-70-100-120-30-45-65-65-80-40-80-55-70-62-35-60-70-95-50-100-25-45-35-55-75-45-90-115-25-50-55-80-45-75-50-80-110-110-75-45-70-30-45-105-40-80-25-45-50-80-55-85-120-80-95-85-85-70-70-20-100-95-48-65-95-95-110-75-55-70-45-70-75-110-125-90-85-50-70-100-90".split(
    "-"
  ),
  spAttack: "65-80-100-60-80-109-50-65-85-20-25-90-20-25-45-35-50-70-25-50-31-61-40-65-50-90-20-45-40-55-75-40-55-85-60-95-50-81-45-85-30-65-75-85-110-45-60-40-90-35-50-40-65-65-95-35-60-70-100-40-50-70-105-120-135-35-50-65-70-85-100-50-80-30-45-55-65-80-40-100-95-120-58-35-60-45-70-40-65-45-85-100-115-130-30-43-73-25-50-55-80-60-125-40-50-35-35-60-60-85-30-45-35-100-40-70-95-35-65-70-100-100-55-115-95-100-55-40-15-60-85-48-45-110-110-95-85-90-115-55-65-60-65-95-125-125-50-70-100-154".split(
    "-"
  ),
  sprites: names.map(
    (pokemon) =>
      `https://img.pokemondb.net/sprites/black-white/anim/front-normal/${pokemon}.gif`
  ),
  move1: "razor-wind-swords-dance-swords-dance-mega-punch-mega-punch-mega-punch-mega-punch-mega-punch-mega-punch-tackle-string-shot-razor-wind-poison-sting-string-shot-swords-dance-razor-wind-razor-wind-razor-wind-cut-swords-dance-razor-wind-razor-wind-bind-bind-mega-punch-mega-punch-scratch-scratch-scratch-scratch-mega-punch-cut-cut-mega-punch-pound-double-slap-headbutt-headbutt-pound-double-slap-razor-wind-razor-wind-swords-dance-swords-dance-swords-dance-scratch-scratch-tackle-razor-wind-scratch-scratch-pay-day-pay-day-mega-punch-mega-punch-karate-chop-karate-chop-double-kick-headbutt-double-slap-double-slap-double-slap-mega-punch-mega-punch-mega-punch-karate-chop-karate-chop-karate-chop-swords-dance-swords-dance-swords-dance-swords-dance-swords-dance-mega-punch-mega-punch-mega-punch-stomp-stomp-pay-day-mega-punch-tackle-tackle-razor-wind-swords-dance-swords-dance-pay-day-pay-day-pound-pound-tackle-take-down-fire-punch-fire-punch-mega-punch-bind-pound-pound-vice-grip-vice-grip-headbutt-headbutt-swords-dance-swords-dance-mega-punch-mega-punch-mega-punch-comet-punch-mega-punch-tackle-tackle-swords-dance-mega-punch-pound-swords-dance-comet-punch-razor-wind-headbutt-horn-attack-horn-attack-tackle-tackle-pound-razor-wind-pound-mega-punch-mega-punch-vice-grip-stomp-tackle-headbutt-headbutt-transform-sand-attack-sand-attack-double-kick-sand-attack-tackle-bind-bind-scratch-scratch-razor-wind-mega-punch-razor-wind-razor-wind-razor-wind-bind-bind-fire-punch-mega-punch".split(
    "-"
  ),
  move2: "swords-dance-cut-cut-fire-punch-fire-punch-fire-punch-ice-punch-ice-punch-ice-punch-string-shot-harden-gust-string-shot-harden-cut-gust-gust-gust-headbutt-cut-whirlwind-whirlwind-slam-headbutt-pay-day-pay-day-swords-dance-swords-dance-cut-cut-pay-day-double-kick-double-kick-pay-day-double-slap-mega-punch-body-slam-body-slam-double-slap-mega-punch-gust-wing-attack-cut-cut-cut-swords-dance-swords-dance-take-down-gust-cut-cut-scratch-scratch-pay-day-pay-day-mega-punch-mega-punch-headbutt-body-slam-headbutt-mega-punch-mega-punch-fire-punch-fire-punch-fire-punch-mega-punch-mega-punch-mega-punch-cut-cut-cut-cut-cut-fire-punch-fire-punch-fire-punch-double-kick-headbutt-stomp-pay-day-take-down-take-down-swords-dance-whirlwind-whirlwind-slam-headbutt-fire-punch-fire-punch-take-down-double-edge-ice-punch-ice-punch-fire-punch-slam-mega-punch-mega-punch-guillotine-guillotine-tackle-tackle-take-down-stomp-fire-punch-fire-punch-double-kick-mega-punch-fire-punch-flamethrower-flamethrower-stomp-pay-day-double-slap-cut-mega-punch-headbutt-take-down-fury-attack-fury-attack-take-down-take-down-double-slap-swords-dance-double-slap-fire-punch-fire-punch-guillotine-headbutt-splash-tackle-horn-drill-SuperMove-headbutt-headbutt-sand-attack-headbutt-take-down-slam-headbutt-sand-attack-razor-wind-wing-attack-pay-day-gust-whirlwind-wing-attack-slam-slam-ice-punch-pay-day".split(
    "-"
  ),
  move3: "cut-bind-bind-thunder-punch-thunder-punch-thunder-punch-mega-kick-mega-kick-mega-kick-snore-iron-defense-whirlwind-bug-bite-iron-defense-fury-attack-wing-attack-wing-attack-wing-attack-tackle-headbutt-fly-fly-headbutt-body-slam-thunder-punch-thunder-punch-cut-cut-double-kick-double-kick-fire-punch-headbutt-headbutt-fire-punch-mega-punch-fire-punch-take-down-take-down-mega-punch-fire-punch-wing-attack-whirlwind-take-down-take-down-body-slam-cut-cut-double-edge-whirlwind-sand-attack-sand-attack-cut-cut-ice-punch-ice-punch-pay-day-pay-day-body-slam-take-down-body-slam-ice-punch-ice-punch-ice-punch-ice-punch-ice-punch-fire-punch-fire-punch-fire-punch-bind-bind-bind-bind-bind-thunder-punch-thunder-punch-thunder-punch-headbutt-fury-attack-headbutt-ice-punch-double-edge-double-edge-cut-fly-fly-headbutt-horn-drill-ice-punch-ice-punch-double-edge-supersonic-thunder-punch-thunder-punch-ice-punch-headbutt-fire-punch-fire-punch-swords-dance-swords-dance-take-down-take-down-double-edge-headbutt-thunder-punch-thunder-punch-mega-kick-fire-punch-ice-punch-psybeam-hyper-beam-headbutt-fire-punch-mega-punch-bind-fire-punch-take-down-double-edge-horn-drill-horn-drill-double-edge-double-edge-mega-punch-cut-mega-punch-ice-punch-thunder-punch-swords-dance-horn-attack-flail-body-slam-body-slam-SuperMove-tackle-tackle-headbutt-tackle-double-edge-headbutt-horn-attack-body-slam-swords-dance-whirlwind-fire-punch-whirlwind-fly-whirlwind-headbutt-headbutt-thunder-punch-fire-punch".split(
    "-"
  ),
  move4: "bind-vine-whip-vine-whip-scratch-scratch-scratch-headbutt-headbutt-headbutt-bug-bite-bug-bite-take-down-electroweb-bug-bite-take-down-whirlwind-whirlwind-whirlwind-body-slam-tackle-fury-attack-fury-attack-body-slam-wrap-slam-mega-kick-sand-attack-sand-attack-headbutt-headbutt-ice-punch-horn-attack-horn-attack-ice-punch-fire-punch-ice-punch-double-edge-double-edge-fire-punch-ice-punch-whirlwind-fly-double-edge-double-edge-take-down-body-slam-body-slam-supersonic-tackle-headbutt-body-slam-headbutt-headbutt-scratch-scratch-fire-punch-fire-punch-take-down-double-edge-take-down-mega-kick-mega-kick-thunder-punch-thunder-punch-thunder-punch-ice-punch-ice-punch-ice-punch-slam-slam-vine-whip-wrap-wrap-headbutt-headbutt-mega-kick-horn-drill-horn-drill-tackle-mega-kick-supersonic-supersonic-gust-jump-kick-jump-kick-horn-drill-body-slam-thunder-punch-thunder-punch-twineedle-water-gun-disable-mega-drain-thunder-punch-tackle-ice-punch-ice-punch-cut-cut-sonic-boom-sonic-boom-strength-take-down-swords-dance-swords-dance-jump-kick-ice-punch-thunder-punch-thunderbolt-thunderbolt-horn-attack-ice-punch-fire-punch-slam-ice-punch-double-edge-leer-body-slam-take-down-supersonic-water-gun-fire-punch-wing-attack-ice-punch-thunder-punch-mega-kick-cut-horn-drill-bounce-take-down-take-down-SuperMove-body-slam-body-slam-tackle-body-slam-ice-beam-horn-attack-horn-drill-take-down-cut-fly-ice-punch-fly-take-down-fly-body-slam-horn-drill-razor-wind-ice-punch".split(
    "-"
  ),
  type: "grass-grass-grass-fire-fire-fire-water-water-water-bug-bug-bug-bug-bug-bug-normal-normal-normal-normal-normal-normal-normal-poison-poison-electric-electric-ground-ground-poison-poison-poison-poison-poison-poison-fairy-fairy-fire-fire-normal-normal-poison-poison-grass-grass-grass-bug-bug-bug-bug-ground-ground-normal-normal-water-water-fighting-fighting-fire-fire-water-water-water-psychic-psychic-psychic-fighting-fighting-fighting-grass-grass-grass-water-water-rock-rock-rock-fire-fire-water-water-electric-electric-normal-normal-normal-water-water-poison-poison-water-water-ghost-ghost-ghost-rock-psychic-psychic-water-water-electric-electric-grass-grass-ground-ground-fighting-fighting-normal-poison-poison-ground-ground-normal-grass-normal-water-water-water-water-water-water-psychic-bug-ice-electric-fire-bug-normal-water-water-water-normal-normal-water-electric-fire-normal-rock-rock-rock-rock-rock-normal-ice-electric-fire-dragon-dragon-dragon-psychic".split(
    "-"
  ),
};
