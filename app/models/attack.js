// // requirements for schema

// // variables
// let playerHealth = this.player.health;
// let enemyHealth = this.enemy.health;
// let playerSpeed = this.player.speed;
// let enemySpeed = this.enemy.speed;
// let enemyHealthBar = document.getElementById("enemy_health");
// let playerHealthBar = document.getElementById("player_health");

// // attack function
// function attack() {
//   let calcDamage;
//   let remainingHealth;

//   if (playerSpeed >= enemySpeed) {
//     calcDamage = player.attack - enemy.defense / 2;
//     remainingHealth = enemyHealth - calcDamage;
//     enemyHealthBar.innerHTML = "Health: " + remainingHealth;
//     checkWinner();
//   } else if (enemySpeed > playerSpeed) {
//     calcDamage = enemy.attack - player.defense / 2;
//     remainingHealth = playerHealth - calcDamage;
//     playerHealthBar.innerHTML = "Health: " + remainingHealth;
//     checkWinner();
//   }
// }

// // check winner function based on hp
// function checkWinner(health) {
//   if (playerHealth <= 0) {
//     alert("Enemy has won!");
//   } else if (enemyHealth <= 0) {
//     alert("Player has won!");
//   }
// }
