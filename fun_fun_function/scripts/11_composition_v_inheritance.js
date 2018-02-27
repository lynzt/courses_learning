// dog = pooper + barker
// cat = pooper + meower
// cleaningRobot = driver + cleaner
// murderRobot = driver + killer
// murderRObotDog = driver + killer + barker

const barker = state => ({
  bark: () => console.log ('woof! i am ' + state.name)
});

const killer = state => ({
  kill: () => console.log ('kill order')
});

const driver = state => ({
  drive: () => state.position = state.position + state.speed
});

barker({name: 'emma'}).bark();

const murderRobotDog = name => {
  let state = {
    name,
    speed: 100,
    position: 0
  }
  return Object.assign(
    {},
    barker(state),
    driver(state),
    killer(state)
  )
}

murderRobotDog('spike').bark();
murderRobotDog('spike').kill();





// // MurderRobot dog breaks this - (kill, drive, bark, !poop)
// Robot
//   .drive()
//
//     CleaningRobot
//       .clean()
//
//     MurderRobot
//       .kill()
//
//
// Animal
//   .poop()
//
//     Dog
//       .bark()
//
//     Cat
//       .meow()
