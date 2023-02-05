import { faker } from "@faker-js/faker";

export const userData = {
    email: faker.internet.email(),
    displayName: "Bot de Testes",
    photoURL: faker.image.imageUrl(),
    accessToken: faker.lorem.word(),
    uid: faker.lorem.word(),
};

export const coastersData = [
    {
        name: "Katapul",
        parkName: "Hopi Hari",
        image: "http://3.bp.blogspot.com/-kEVd2ewcclo/U1l4857vdEI/AAAAAAAAD08/B9JIBu4v5s4/s1600/katapul1.jpg ",
        rcdbId: "1152"
    },
    {
        name: "Montezum",
        parkName: "Hopi Hari",
        image: "https://viagemempauta.com.br/wp-content/uploads/2021/06/6-hopi-hari.jpg",
        rcdbId: "1150"
    },
    {
        name: "Speedi '64",
        parkName: "Hopi Hari",
        image: "https://blog.hopihari.com.br/wp-content/uploads/2019/07/Bat-Hatari-2.png",
        rcdbId: "1153"
    },
    {
        name: "Vurang",
        parkName: "Hopi Hari",
        image: "https://blog.hopihari.com.br/wp-content/uploads/2019/07/Vurang-2-1.png",
        rcdbId: "1151"
    },
    {
        name: "Dum-dum",
        parkName: "Beto Carrero World",
        image: "https://infantasycare.com/wp-content/uploads/2021/04/IMG_0064-1024x683-1.jpg",
        rcdbId: "3777"
    },
    {
        name: "Firewhip",
        parkName: "Beto Carrero World",
        image: "https://www.essemundoenosso.com.br/wp-content/uploads/2017/11/fire-whip-montanha-russa-beto-carrero-2.jpg",
        rcdbId: "4149"
    },
    {
        name: "Star Mountain",
        parkName: "Beto Carrero World",
        image: "https://www.agoraviagem.com.br/wp-content/uploads/2022/08/montanha-russa.jpg",
        rcdbId: "1154"
    },
    {
        name: "Tigor Mountain",
        parkName: "Beto Carrero World",
        image: "https://turistaprofissional.com/wp-content/uploads/2017/12/montanha-russa.jpg",
        rcdbId: "3686"
    },
    {
        name: "Dragão",
        parkName: "Mirabilandia",
        image: "https://mirabilandia.com.br/wp-content/uploads/2018/09/drag%C3%A3o-300-ed.jpg",
        rcdbId: "3182"
    },
    {
        name: "Super Tornado",
        parkName: "Mirabilandia",
        image: "https://s3.wasabisys.com/hapfun/2018/06/mirabilandia-parque-de.jpg",
        rcdbId: "3701"
    },
    {
        name: "Brucomela",
        parkName: "Cidade da Criança",
        image: "https://cloudfront-us-east-1.images.arcpublishing.com/estadao/TYPBK5ZDFZORFKMBPRCBP6ZRXA.jpg",
        rcdbId: "10785"
    },
    {
        name: "Magic Bee",
        parkName: "Cidade da Criança",
        image: "https://vipzinho.com.br/wp-content/uploads/2018/01/cidade-da-crianca-2.jpg",
        rcdbId: "16024"
    },
    {
        name: "Montanha Russa do Astronauta",
        parkName: "Parque da Mônica",
        image: "https://parquedamonica.com.br/web/public/uploads/imagens/3ede9868fed35143450c364159409e7a.png",
        rcdbId: "1159"
    },
    {
        name: "Youhooo!",
        parkName: "Parque Unipraias",
        image: "https://www.unipraias.com.br/assets/img/uploaded/img_5defdade85e030_30262230.jpg",
        rcdbId: "13084"
    },
    {
        name: "Dragon",
        parkName: "Playcenter Family",
        image: "https://www.adibra.com.br/Content/upload/photos/1440/playfamiliyout2019fmoraes4835.jpg",
        rcdbId: "2476"
    },
    {
        name: "Mad Montanha",
        parkName: "Ácqua Lokos",
        image: "https://acqualokos.com.br/wp-content/uploads/mad_montanha-1-1097x650.jpg",
        rcdbId: "2673"
    },
    {
        name: "Inversa",
        parkName: "Ácqua Lokos",
        image: "https://acqualokos.com.br/wp-content/uploads/la_inversa-15-1-1097x650.jpg",
        rcdbId: "11537"
    },
    {
        name: "Alpen Blizzard",
        parkName: "Alpen Park",
        image: "http://www.bemvindosabordo.com.br/blog/images/posts/g7id6yvp45_ql3s7.jpg",
        rcdbId: "10361"
    },
    {
        name: "Trenó",
        parkName: "Alpen Park",
        image: "http://3.bp.blogspot.com/-AVAB441Uw2Y/Udb4EB7YX3I/AAAAAAAAAuc/AhOLEiM6Efs/s1600/Treno.jpg",
        rcdbId: "13085"
    },
    {
        name: "Montanha Russa",
        parkName: "Neo Geo Family",
        image: "https://s3.wasabisys.com/hapfun/2017/04/Montanha-Russa2-inter.jpg",
        rcdbId: "18052"
    },
    {
        name: "Montanha Maluca",
        parkName: "Neo Geo Family",
        image: "http://neogeo.com.br/wp-content/uploads/2022/01/d_montanhamaluca_inter.jpg",
        rcdbId: "2509"
    },
    {
        name: "Roller Coaster",
        parkName: "Nova Nicolândia",
        image: "https://yuupe.com/uploads/c1604ad50de69aa9d26d97284b68c777.jpeg",
        rcdbId: "3531"
    },
    {
        name: "Colossu's Loop",
        parkName: "Nova Nicolândia",
        image: "https://image.jimcdn.com/app/cms/image/transf/dimension=319x1024:format=png/path/s0d819025383cdd21/image/i59f952bb07b70177/version/1644322408/image.png",
        rcdbId: "4249"
    },
    {
        name: "Montanha Russa",
        parkName: "Parque de Diversões Marisa",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/10/85/ea/1e/para-brincar.jpg",
        rcdbId: "9021"
    },
    {
        name: "Twisted Coaster",
        parkName: "HotZone",
        image: "https://conteudo.imguol.com.br/c/entretenimento/c5/2016/06/19/twister-coaster-montanha-russa-do-parque-hotzone-no-rio-de-janeiro-1466351557278_300x200.jpg",
        rcdbId: "10766"
    },
    {
        name: "Air Grover",
        parkName: "Busch Gardens Tampa",
        image: "http://www.qualviagem.com.br/wp-content/uploads/2016/07/Air-Grover-e1469456259466.jpg",
        rcdbId: "8632"
    },
    {
        name: "Cheetah Hunt",
        parkName: "Busch Gardens Tampa",
        image: "https://fastly.4sqi.net/img/general/600x600/22586633_AwOfp6r9NyGWgX2MlL0b_1CUR_Eu7Dr1NqRvCCjEG4A.jpg",
        rcdbId: "9456"
    },
    {
        name: "Cobra's Curse",
        parkName: "Busch Gardens Tampa",
        image: "https://www.falandodeviagem.com.br/imagens18/cobrasfdv.jpg",
        rcdbId: "12781"
    },
    {
        name: "Iron Gwazi",
        parkName: "Busch Gardens Tampa",
        image: "https://www.seaworldparks.com.br/source/files/c/1328/Iron_Gwazi-468420_1900-700-0-0.jpg",
        rcdbId: "16985"
    },
    {
        name: "Kumba",
        parkName: "Busch Gardens Tampa",
        image: "https://orlandothemeparkzone.com/wp-content/uploads/2022/03/Kumba-at-Busch-Gardens-Tampa-Bay-to-Close-Permanently.jpg",
        rcdbId: "94"
    },
    {
        name: "Montu",
        parkName: "Busch Gardens Tampa",
        image: "http://parkaholic.com/wp-content/uploads/2013/12/Busch_Gardens_Tampa_Bay_-_Montu.jpg",
        rcdbId: "87"
    },
    {
        name: "SandSerpent",
        parkName: "Busch Gardens Tampa",
        image: "https://bgtsafari.files.wordpress.com/2019/02/6971603563_e9d3023410_k-e1551202943146.jpg",
        rcdbId: "2595"
    },
    {
        name: "Scorpion",
        parkName: "Busch Gardens Tampa",
        image: "https://www.ultimaterollercoaster.com/coasters/pictures/scorpion/img/busch_gardens_scorpion_2.jpg",
        rcdbId: "95"
    },
    {
        name: "SheiKra",
        parkName: "Busch Gardens Tampa",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/SheiKraSeating8x3.jpg",
        rcdbId: "2662"
    },
    {
        name: "Tigris",
        parkName: "Busch Gardens Tampa",
        image: "https://media.wtsp.com/assets/WTSP/images/35f71d30-dfd7-4c5f-bfbf-f88a8bea8816/35f71d30-dfd7-4c5f-bfbf-f88a8bea8816_1140x641.jpg",
        rcdbId: "16607"
    },
    {
        name: "Ice Breaker",
        parkName: "SeaWorld Orlando",
        image: "https://www.seaworldparks.com.br/source/files/c/1087/2021_SWO_IceBreakerShoot-4102-695298_1920-1280-0-0.jpg",
        rcdbId: "17420"
    },
    {
        name: "Journey to Atlantis",
        parkName: "SeaWorld Orlando",
        image: "https://allears.net/wp-content/uploads/2020/06/Journey-to-Atlantis-SeaWorld-Orlando-Reopening-Day.jpg",
        rcdbId: "1904"
    },
    {
        name: "Kraken",
        parkName: "SeaWorld Orlando",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kraken_%28SeaWorld_Orlando%29_01.jpg",
        rcdbId: "581"
    },
    {
        name: "Mako",
        parkName: "SeaWorld Orlando",
        image: "https://www.ultimaterollercoaster.com/coasters/pictures/mako/img/seaworld-orlando-mako_1400_500x750.jpg",
        rcdbId: "12758"
    },
    {
        name: "Manta",
        parkName: "SeaWorld Orlando",
        image: "https://i.pinimg.com/originals/1b/e4/28/1be428cf5d9041f68d4af845477e69c5.jpg",
        rcdbId: "4190"
    },
    {
        name: "Super Grover's Box Car Derby",
        parkName: "SeaWorld Orlando",
        image: "https://i.ytimg.com/vi/niEj7GIgbGM/maxresdefault.jpg",
        rcdbId: "3340"
    },
    {
        name: "Harry Potter and the Escape from Gringotts",
        parkName: "Universal Studios",
        image: "https://www.tripsavvy.com/thmb/4DixkQ70a3Ux2JBKr-WDK2rGbVk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/_resources_digitalassets_HP-and-the-Escape-from-Gringotts-2-56a6d8af3df78cf772908849.jpg",
        rcdbId: "11887"
    },
    {
        name: "Hollywood Rip, Ride, Rockit",
        parkName: "Universal Studios",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Hollywood_Rip_Ride_Rockit_coaster_ride.jpg",
        rcdbId: "3866"
    },
    {
        name: "Revenge of the Mummy",
        parkName: "Universal Studios",
        image: "https://www.themeparkinsider.com/art/parks/mummy_car.jpg",
        rcdbId: "2232"
    },
    {
        name: "Flight of the Hippogriff",
        parkName: "Islands of Adventure",
        image: "https://www.parkz.com.au/cache/photo/cover/general/2020/03/96a8481b215a15a0f2db60862c8be68a.jpg",
        rcdbId: "703"
    },
    {
        name: "Hagrid's Magical Creatures Motorbike Adventure",
        parkName: "Islands of Adventure",
        image: "https://blog.discoveruniversal.com/wp-content/uploads/2019/05/Scope-of-Hagrids-Magical-Creatures-Motorbike-Adventure.jpg",
        rcdbId: "15330"
    },
    {
        name: "Incredible Hulk",
        parkName: "Islands of Adventure",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/90/The_Hulk_Coaster_%285143123646%29.jpg",
        rcdbId: "557"
    },
    {
        name: "Pteranodon Flyers",
        parkName: "Islands of Adventure",
        image: "https://www.universalorlando.com/webdata/k2/en/us/files/Images/gds/ioa-pteranodon-flyers-ride-mom-daughter-b.jpg",
        rcdbId: "559"
    },
    {
        name: "VelociCoaster",
        parkName: "Islands of Adventure",
        image: "https://blog.discoveruniversal.com/wp-content/uploads/2021/04/VC1.jpg",
        rcdbId: "6992"
    },
    {
        name: "Barnstormer",
        parkName: "Magic Kingdom",
        image: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/630/354/90/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/wdw/attractions/barnstormer-starring-great-goofini-00.jpg",
        rcdbId: "274"
    },
    {
        name: "Big Thunder Mountain Railroad",
        parkName: "Magic Kingdom",
        image: "https://www.wdwinfo.com/wp-content/uploads/2022/06/big-thunder-mountain-train.jpeg",
        rcdbId: "273"
    },
    {
        name: "Seven Dwarfs Mine Train",
        parkName: "Magic Kingdom",
        image: "https://4.bp.blogspot.com/-q7btJy-Jr98/U4Z_MC8IGVI/AAAAAAAAQng/pwo1unS3a14/s1600/disney7.jpg",
        rcdbId: "9720"
    },
    {
        name: "Space Mountain",
        parkName: "Magic Kingdom",
        image: "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2015/01/SPP68696.jpg",
        rcdbId: "267"
    },
    {
        name: "Expedition Everest",
        parkName: "Animal Kingdom",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Expedition_Everest.jpg",
        rcdbId: "2389"
    },
    {
        name: "Rock 'n' Roller Coaster",
        parkName: "Hollywood Studios",
        image: "https://cdn.weirddisney.com/app/uploads/2021/12/Rock-and-Rollercoaster-Train-Back-1344x756.jpg",
        rcdbId: "560"
    },
    {
        name: "Slinky Dog Dash",
        parkName: "Hollywood Studios",
        image: "https://www.indopraorlando.com.br/wp-content/uploads/2019/08/asjgg46987879853.jpg",
        rcdbId: "13377"
    },
    {
        name: "Guardians of the Galaxy: Cosmic Rewind",
        parkName: "Epcot",
        image: "https://res.cloudinary.com/simpleview/image/upload/v1652456208/clients/orlandofl/2660_wonders_of_xandar_gotg_cosmic_rewind_1_0019b92b-353e-4df6-873f-897039bec56c.jpg",
        rcdbId: "15504"
    }
];
