import { faker } from "@faker-js/faker";

export const userData = {
    email: faker.internet.email(),
    displayName: faker.name.fullName(),
    photoURL: faker.image.imageUrl(),
    accessToken: faker.lorem.word(),
    uid: faker.lorem.word(),
};

export const coastersData = [
    {
        name: "Katapul",
        parkName: "Hopi Hari",
        image: "http://3.bp.blogspot.com/-kEVd2ewcclo/U1l4857vdEI/AAAAAAAAD08/B9JIBu4v5s4/s1600/katapul1.jpg",
        rcdbId: "1152",
    },
    {
        name: "Montezum",
        parkName: "Hopi Hari",
        image: "https://viagemempauta.com.br/wp-content/uploads/2021/06/6-hopi-hari.jpg",
        rcdbId: "1150",
    },
    {
        name: "Speedi '64",
        parkName: "Hopi Hari",
        image: "https://blog.hopihari.com.br/wp-content/uploads/2019/07/Bat-Hatari-2.png",
        rcdbId: "1153",
    },
    {
        name: "Vurang",
        parkName: "Hopi Hari",
        image: "https://blog.hopihari.com.br/wp-content/uploads/2019/07/Vurang-2-1.png",
        rcdbId: "1151",
    },
    {
        name: "Dum-dum",
        parkName: "Beto Carrero World",
        image: "https://infantasycare.com/wp-content/uploads/2021/04/IMG_0064-1024x683-1.jpg",
        rcdbId: "3777",
    },
    {
        name: "Firewhip",
        parkName: "Beto Carrero World",
        image: "https://www.essemundoenosso.com.br/wp-content/uploads/2017/11/fire-whip-montanha-russa-beto-carrero-2.jpg",
        rcdbId: "4149",
    },
    {
        name: "Star Mountain",
        parkName: "Beto Carrero World",
        image: "https://www.agoraviagem.com.br/wp-content/uploads/2022/08/montanha-russa.jpg",
        rcdbId: "1154",
    },
    {
        name: "Tigor Mountain",
        parkName: "Beto Carrero World",
        image: "https://turistaprofissional.com/wp-content/uploads/2017/12/montanha-russa.jpg",
        rcdbId: "3686",
    },
    {
        name: "Dragão",
        parkName: "Mirabilandia",
        image: "https://mirabilandia.com.br/wp-content/uploads/2018/09/drag%C3%A3o-300-ed.jpg",
        rcdbId: "3182",
    },
    {
        name: "Super Tornado",
        parkName: "Mirabilandia",
        image: "https://s3.wasabisys.com/hapfun/2018/06/mirabilandia-parque-de.jpg",
        rcdbId: "3701",
    },
    {
        name: "Brucomela",
        parkName: "Cidade da Criança",
        image: "https://cloudfront-us-east-1.images.arcpublishing.com/estadao/TYPBK5ZDFZORFKMBPRCBP6ZRXA.jpg",
        rcdbId: "10785",
    },
    {
        name: "Magic Bee",
        parkName: "Cidade da Criança",
        image: "https://vipzinho.com.br/wp-content/uploads/2018/01/cidade-da-crianca-2.jpg",
        rcdbId: "16024",
    },
    {
        name: "Montanha Russa do Astronauta",
        parkName: "Parque da Mônica",
        image: "https://parquedamonica.com.br/web/public/uploads/imagens/3ede9868fed35143450c364159409e7a.png",
        rcdbId: "1159",
    },
    {
        name: "Youhooo!",
        parkName: "Parque Unipraias",
        image: "https://www.unipraias.com.br/assets/img/uploaded/img_5defdade85e030_30262230.jpg",
        rcdbId: "13084",
    },
    {
        name: "Dragon",
        parkName: "Playcenter Family",
        image: "https://www.adibra.com.br/Content/upload/photos/1440/playfamiliyout2019fmoraes4835.jpg",
        rcdbId: "2476",
    },
]