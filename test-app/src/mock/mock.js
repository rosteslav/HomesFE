const mockImages = [
    'https://as2.ftcdn.net/v2/jpg/05/03/48/07/1000_F_503480723_cbLZ2OtEBubqwnLqn4XJxidGyBGHbsvo.jpg',
    'https://as2.ftcdn.net/v2/jpg/02/22/18/07/1000_F_222180746_rI8LL9IgEEMxRQ2O8S6b5NIFt1ZWqN7Y.jpg',
    'https://as1.ftcdn.net/v2/jpg/06/21/36/36/1000_F_621363659_fOrtWQwFd9MiRw8G8dR0fNJZVYBcHYMI.jpg',
    'https://as2.ftcdn.net/v2/jpg/00/95/76/39/1000_F_95763977_GAvHJGassDPZPNlMFlO8670k9Xo5yU24.jpg',
    'https://as1.ftcdn.net/v2/jpg/05/18/06/72/1000_F_518067277_Mg6VRoC2Ww5dlsWBVTMBTsy1qNxiwzyM.jpg',
    'https://as1.ftcdn.net/v2/jpg/00/71/55/76/1000_F_71557675_aECLxDk80NceQqeacU5r8ufLiNhonrQD.jpg',
    'https://as2.ftcdn.net/v2/jpg/00/06/85/35/1000_F_6853535_4gy5tBF1h1rtkqgY0hJHFuIkw4B9KUGE.jpg',
    'https://as2.ftcdn.net/v2/jpg/02/28/35/05/1000_F_228350555_P4eaFFpGEwyz0Dcj4Ek86LMotK0A8igO.jpg',
    'https://as2.ftcdn.net/v2/jpg/06/46/91/39/1000_F_646913931_pF139D2S6N9EhCyJNy7YlyB45YcQrt8C.jpg',
];

export const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * mockImages.length);

    return mockImages[randomIndex];
};
