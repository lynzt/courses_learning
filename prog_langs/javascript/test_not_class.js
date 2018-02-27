let dog = () => {
  const sound = 'wolf';
  return {
    talk: () => {
      console.log(sound);
    }
  }
}
let emma = dog();
emma.talk();
