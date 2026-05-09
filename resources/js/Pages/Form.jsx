import { useState, useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import Header from '../Components/Header'
import '../../css/form.css'

export default function Form(props) {
    const product = props.product
// at the top of your Form function add this:
const allImages = []
if (product && product.image) allImages.push(product.image)
if (product && product.images) product.images.forEach(img => allImages.push(img.image))

const [currentSlide, setCurrentSlide] = useState(0)

useEffect(() => {
    if (allImages.length <= 1) return
    const interval = setInterval(() => {
        setCurrentSlide(prev => prev === allImages.length - 1 ? 0 : prev + 1)
    }, 5000)
    return () => clearInterval(interval)
}, [allImages.length])

function prevSlide() {
    setCurrentSlide(currentSlide === 0 ? allImages.length - 1 : currentSlide - 1)
}

function nextSlide() {
    setCurrentSlide(currentSlide === allImages.length - 1 ? 0 : currentSlide + 1)
}
    
const { data, setData, post, errors, wasSuccessful } = useForm({
  name: '',
  quantity: 1,
  article_name: product ? product.name : '',
  color: '',
  size: '',
  phone: '',
  wilaya: '',
  baladiya: '',       // ← add this
  delivery_type: 'home',
  address: '',
  price: product ? product.price : 0,
})

    function handleSubmit(e) {
    e.preventDefault()
    if (!data.color) {
        alert('Veuillez choisir une couleur')
        return
    }
    if (!data.size) {
        alert('Veuillez choisir une taille')
        return
    }
    post('/clients')
}

    const price = product ? product.price : 0

  const wilayas = {
  'Adrar':                { home: 1200, desk: 900,  baladiyas: ['Adrar', 'Tamest', 'Charouine', 'Reggane', 'Aoulef', 'Timimoun', 'Fenoughil', 'Tamentit', 'Zaouiet Kounta', 'Bordj Badji Mokhtar', 'Bouda', 'Aougrout', 'Tsabit', 'Metarfa', 'Ouled Ahmed Timmi', 'Ouled Saïd', 'Sali', 'Akabli', 'In Zghmir'] },
  'Chlef':                { home: 800,  desk: 550,  baladiyas: ['Chlef', 'Ténès', 'Béni Haoua', 'Sobha', 'Bréwik', 'Ouled Fares', 'Sidi Akkacha', 'Boukadir', 'Beni Rached', 'Taougrite', 'Beni Bouattab', 'El Karimia', 'Tadjna', 'Talassa', 'Hérenfa', 'Oued Fodda', 'Ouled Ben Abdelkader', 'Dahra', 'Sendjas', 'Zeboudja', 'Abou El Hassan', 'El Marsa', 'Chettia', 'Sidi Abderrahmane', 'Moussadek', 'El Hadjadj', 'Labiod Medjadja', 'Oued Goussine', 'Ain Merane', 'Chorfa', 'Harchoun', 'Oum Drou', 'Benairia', 'Ouled Abbès'] },
  'Laghouat':             { home: 1000, desk: 700,  baladiyas: ['Laghouat', 'Ksar El Hirane', 'Bennasser Ben Chohra', 'Sidi Makhlouf', 'Hassi Delaa', 'Hassi R\'Mel', 'Ain Mahdi', 'Tadjemout', 'Kheneg', 'Gueltat Sidi Saad', 'Ain Sidi Ali', 'Beidha', 'Brida', 'El Ghicha', 'Guettara', 'Sidi Bouzid', 'Sebgag', 'Taouiala', 'Tadjrouna', 'Aflou', 'El Haouaita', 'Zinina', 'Oued Morra', 'Oued M\'Zi'] },
  'Oum El Bouaghi':       { home: 900,  desk: 650,  baladiyas: ['Oum El Bouaghi', 'Aïn Beïda', 'Aïn M\'lila', 'Souk Naamane', 'Aïn Fakroun', 'Rahia', 'Belala', 'Aïn Babouche', 'Behir Chergui', 'El Amiria', 'Sigus', 'El Fedjoudj', 'Ouled Hamla', 'Dhalaa', 'Aïn Zitoun', 'Ouled Gacem', 'Ksar Sbahi', 'Hanchir Toumghani', 'El Djazia', 'Fkirina', 'Souahlia', 'Meskiana', 'Aïn Kercha', 'Hamma Bouziane', 'El Harmilia'] },
  'Batna':                { home: 900,  desk: 650,  baladiyas: ['Batna', 'Ghassira', 'Maafa', 'Merouana', 'Seriana', 'Menaa', 'El Madher', 'Tazoult', 'N\'gaous', 'Guigba', 'Inoughissen', 'Ouyoun El Assafir', 'Djerma', 'Bitam', 'Abdelmoumène', 'Boulhilat', 'Lazrou', 'Timgad', 'Ouled Si Slimane', 'Tighanimine', 'El Hassi', 'Aïn Touta', 'Ichmoul', 'Fesdis', 'Boumagueur', 'Barika', 'Djezzar', 'Tigherghar', 'Bouzina', 'Chemora', 'Ouled Aouf', 'Hidoussa', 'Teniet El Abed', 'Oued El Ma', 'Talkhamt', 'Boulhaf Dyr', 'Bélaïlou', 'Seggana', 'Aïn Djasser', 'Ouled Zouai', 'Béni Foudhala El Hakania', 'Oued Chaaba', 'Taxlent', 'Gosbat', 'Ouled Ammar', 'T\'kout', 'Aïn Yagout', 'Arris', 'Kimmel', 'Tilatou', 'Aïn Bouziane', 'Lemsane', 'Aïn Roua', 'Chegga'] },
  'Bejaïa':               { home: 850,  desk: 600,  baladiyas: ['Bejaïa', 'Amizour', 'Ferraoune', 'Oued Ghir', 'Béni Maouche', 'Aokas', 'Beni Djellil', 'Ighil Ali', 'Fenaïa Ilmaten', 'Toudja', 'Darguina', 'Sidi Aïch', 'Aït Smail', 'Bouhamza', 'Beni Ksila', 'Tinebdar', 'Tichy', 'Souk El Ténine', 'Melbou', 'Akbou', 'Ighram', 'Amalou', 'Adekar', 'Aïn Légradj', 'Tamridjet', 'Aït Rzine', 'Chemini', 'Seddouk', 'Tazmalt', 'Aït Mjahad', 'Chellata', 'Maâtkas', 'Tibane', 'Tala Hamza', 'Barbacha', 'Beni Méllikeche', 'Souk Oufella', 'Taourirt Ighil', 'Boukhelifa', 'Tifra', 'El Kseur', 'Kendira', 'Tizi N\'Berber', 'Béni Cornine', 'Ouzlaguen', 'Boudjellil', 'Kherrata', 'Draa El Gaïd', 'Béni Maouche', 'Tamokra', 'Sidi Ayad', 'Boudjelil'] },
  'Biskra':               { home: 950,  desk: 700,  baladiyas: ['Biskra', 'Ouled Djellal', 'Sidi Khaled', 'Débila', 'Foughala', 'Zeribet El Oued', 'Tolga', 'Bouchagroun', 'M\'Chouneche', 'El Kantara', 'Aïn Naga', 'El Haouch', 'Branis', 'Chetma', 'Sidi Okba', 'Ain Zaatout', 'El Ghrous', 'Lichana', 'Ourlal', 'Mlili', 'Oumache', 'Bordj Ben Azzouz', 'Lioua', 'Ras El Miaad', 'Besbes', 'Meziraa', 'Doucen', 'El Feidh', 'Chaiba', 'Leghrous', 'MetLili'] },
  'Béchar':               { home: 1100, desk: 800,  baladiyas: ['Béchar', 'Erdouz', 'Ouled Khodeïr', 'Beni Ikhlef', 'Mécheria', 'Aïn Ouled Moussa', 'Lahmar', 'Timoudi', 'Ksabi', 'Meridja', 'Igli', 'Tabalbala', 'Tamtert', 'El Ouata', 'Mogheul', 'Abadla', 'Erg Ferradj', 'Kerzaz', 'Béni Abbès', 'Ouled Khoudir'] },
  'Blida':                { home: 700,  desk: 500,  baladiyas: ['Blida', 'Chréa', 'Meftah', 'Hammam Melouane', 'Ben Kheddah', 'Soumaa', 'Mouzaïa', 'Oued El Alleug', 'Beni Tamou', 'Bouarfa', 'Bougara', 'Chiffa', 'Boufarik', 'Larbaa', 'Beni Mered', 'Bougara', 'Ouled Yaïch', 'Chebli', 'El Afroun', 'Guerrouaou', 'Ain Romana'] },
  'Bouira':               { home: 800,  desk: 550,  baladiyas: ['Bouira', 'El Asnam', 'Aïn Bessem', 'Aïn El Hadjar', 'Dirah', 'El Hachimia', 'Rovigo', 'Haizer', 'Lakhdaria', 'Bouderbala', 'Taghzout', 'Bordj Okhriss', 'Dechmia', 'Aïn Turk', 'Ahl El Ksar', 'Saharidj', 'Ridane', 'Hanif', 'M\'Chedallah', 'Souk El Khemis', 'El Mokrani', 'Chorfa', 'Aomar', 'Ain El Turc', 'Djebahia', 'Aïn Laloui', 'Maâla', 'Ouled Rached', 'Sour El Ghozlane', 'Zbarbar'] },
  'Tamanrasset':          { home: 1300, desk: 1000, baladiyas: ['Tamanrasset', 'Abalessa', 'In Ghar', 'In Guezzam', 'Tin Zaouatine', 'In Salah', 'In Amenas', 'Foggaret Ez Zoua'] },
  'Tébessa':              { home: 950,  desk: 700,  baladiyas: ['Tébessa', 'Bir El Ater', 'Cheria', 'Stah Guentis', 'El Aouinet', 'Lahouidjbet', 'Safsaf El Ouesra', 'Bir Mokadem', 'Negrine', 'Guentis', 'Bekkaria', 'Boukhadra', 'Ouenza', 'El Mа\'Dheur', 'Elhouana', 'Tebessa', 'Hammamet', 'Boulhef', 'El Ogla', 'El Kouif'] },
  'Tlemcen':              { home: 900,  desk: 650,  baladiyas: ['Tlemcen', 'Beni Mester', 'Aïn Tallout', 'Remchi', 'El Fehoul', 'Sabra', 'Ghazaouet', 'Souahlia', 'Dar Yaghmouracène', 'Aïn Fezza', 'Ouled Mimoun', 'Amieur', 'Aïn Ghoraba', 'Chetouane', 'Mansourah', 'Beni Snous', 'Bab El Assa', 'Aïn Nehala', 'Hennaya', 'Maghnia', 'Hammam Boughrara', 'Sidi Abdellah', 'Azail', 'Fillaoucène', 'Béni Boussaid', 'Marsa Ben M\'Hidi', 'Nedroma', 'Beni Khellad', 'Aïn Kebira', 'Aïn Youcef', 'Zidane', 'Bensekrane', 'Aïn Fetah', 'El Gor', 'Honaine', 'Tidjen', 'Aïn Bouhelal', 'Sidi Djillali', 'Beni Bahdel', 'El Aricha', 'Souk Tleta'] },
  'Tiaret':               { home: 850,  desk: 600,  baladiyas: ['Tiaret', 'Sougueur', 'Aïn Deheb', 'Aïn El Hadid', 'Aïn Kermes', 'Hamadia', 'Ksar Chellala', 'Mehdia', 'Mellakou', 'Dahmouni', 'Rahouia', 'Medrissa', 'Sidi Bakhti', 'Madna', 'Guertoufa', 'Sebt', 'Aïn Bouchekif', 'Sidi Ali Mellal', 'Naïma', 'Sidi Hosni', 'Tousnina', 'Aïn Zarit', 'Bougara', 'Zmalet El Emir Abdelkader', 'Meghila', 'Oued Lilli', 'Mahia', 'Ouled Djerad', 'Chehaita', 'Takhemaret', 'Aïn El Assel', 'Frenda', 'Aïn Dzarit', 'Rechaïga', 'Djillali Ben Amar', 'Ain Kermes', 'Oued Lilli', 'Ghassoul'] },
  'Tizi Ouzou':           { home: 800,  desk: 550,  baladiyas: ['Tizi Ouzou', 'Aïn El Hammam', 'Akbil', 'Freha', 'Souama', 'Mechtrass', 'Irdjen', 'Timizart', 'Keurzi Mahmoud', 'Boghni', 'Aghrib', 'Iflissen', 'Béni Zmenzer', 'Iboudraren', 'Akerrou', 'Tigzirt', 'Dra El Mizan', 'Aïn Zaouia', 'M\'Kira', 'Aït Yahia Moussa', 'Tirmitine', 'Azazga', 'Idjeur', 'Makouda', 'Draa Ben Khedda', 'Ouaguenoun', 'Aït Chafaa', 'Larbaâ Nath Irathen', 'Tizi Rached', 'Zekri', 'Ouadhias', 'Aït Aggouacha', 'Mizrana', 'Beni Aissi', 'Beni Zikki', 'Beni Douala', 'Aït Mahmoud', 'Maâtkas', 'Aït Toudert', 'Souk El Ténine', 'Aït Bouadou', 'Illoula Oumalou', 'Yakouren', 'Aït Yahia', 'Aït Oumalou', 'Tizi Ghennif', 'Aït Boumahdi', 'Iferhounène', 'Aït Aggouacha', 'Aït Bouadou', 'Akerrou', 'Boghni', 'Tizi N\'Tleta', 'Aït Khellili', 'Sidi Naamane', 'Ouled Aïssa', 'Aghribs', 'Imsouhal', 'Aït Aïssa Mimoun'] },
  'Alger':                { home: 700,  desk: 500,  baladiyas: ['Alger Centre', 'Bab El Oued', 'Hussein Dey', 'El Harrach', 'Bir Mourad Raïs', 'Birkhadem', 'Kouba', 'El Biar', 'Hydra', 'Ben Aknoun', 'Bouzareah', 'Casbah', 'Sidi M\'Hamed', 'Belouizdad', 'Bab Ezzouar', 'Dar El Beïda', 'Rouïba', 'Réghaia', 'Aïn Taya', 'Bordj El Bahri', 'El Marsa', 'Hammamet', 'Raïs Hamidou', 'Djasr Kasentina', 'El Magharia', 'Oued Koriche', 'Birmandreïs', 'Dely Ibrahim', 'Aïn Bénian', 'Staouéli', 'Zeralda', 'Mahelma', 'Rahmania', 'Souidania', 'Cheraga', 'Ouled Fayet', 'El Achour', 'Draria', 'Douéra', 'Baraki', 'Les Eucalyptus', 'Baba Hassen', 'Khraicia', 'Saoula'] },
  'Djelfa':               { home: 900,  desk: 650,  baladiyas: ['Djelfa', 'Moudjbara', 'El Idrissia', 'Aïn Maabed', 'Sed Rahal', 'Faidh El Botma', 'Birine', 'Beni Yacoub', 'Guernini', 'Selmana', 'Aïn Chouhada', 'Zaafrane', 'Deldoul', 'Sidi Baizid', 'Leksob', 'Oum Laadham', 'Hassi Bahbah', 'Aïn El Ibel', 'Charef', 'Guettara', 'Messaad', 'Dar Chioukh', 'Douis', 'Had Sahary', 'Aïn Oussera', 'Benhar', 'El Khemis', 'Bouira Lahdab', 'Zaccar', 'El Azizia', 'El Guedid', 'Hassi El Euch', 'M\'Liliha', 'Tadmit'] },
  'Jijel':                { home: 850,  desk: 600,  baladiyas: ['Jijel', 'El Milia', 'Taher', 'Chekfa', 'Chahna', 'El Ancer', 'Sidi Maarouf', 'Settara', 'El Aouana', 'Ziama Mansouriah', 'Djimla', 'Kaous', 'Ghebala', 'Bouraoui Belhadef', 'Ouled Yahia Khedrouche', 'Boudriaa Ben Yadjis', 'Ouadjana', 'Selma Benziada', 'Texenna', 'Sidi Abdelaziz', 'Emir Abdelkader', 'Eraguène'] },
  'Sétif':                { home: 900,  desk: 650,  baladiyas: ['Sétif', 'Aïn El Kebira', 'Aïn Oulmène', 'Aïn Roua', 'Aïn Sebt', 'Aïn Arnat', 'Aïn Azel', 'Aïn Legradj', 'Aït Naoual Mezada', 'Aït Tizi', 'Amoucha', 'Babor', 'Beidha Bordj', 'Béni Aziz', 'Béni Chebana', 'Béni Mouhli', 'Béni Ourtilane', 'Bousselam', 'Boutaleb', 'Bir El Arch', 'Bir Haddada', 'Dehamcha', 'Djemila', 'El Eulma', 'El Ouldja', 'Guidjel', 'Guenzet', 'Guellal', 'Hammam Guergour', 'Hammam Sokhna', 'Hamma', 'Ksar El Abtal', 'Maoklane', 'Mezloug', 'Ouled Addouane', 'Ouled Sabor', 'Ouled Tebben', 'Rasfa', 'Salah Bey', 'Tachouda', 'Talaifacene', 'Tizi N\'Bechar', 'Tizi Ouled Issa'] },
  'Saïda':                { home: 900,  desk: 650,  baladiyas: ['Saïda', 'Doui Thabet', 'Aïn El Hadjar', 'Aïn Soltane', 'Ouled Brahim', 'Sidi Boubekeur', 'El Hassasna', 'Maamora', 'Yerb', 'Ouled Khaled', 'Moulay Larbi', 'Aïn Skhouna', 'Sidi Ahmed', 'Sidi Amar', 'Hounet'] },
  'Skikda':               { home: 900,  desk: 650,  baladiyas: ['Skikda', 'Ben Azzouz', 'Hamadi Krouma', 'Oum Toub', 'Ramdane Djamel', 'El Harrouch', 'Zighoud Youcef', 'Collo', 'Tamalous', 'Kerkera', 'El Hadaik', 'Azzaba', 'Djendel Saadi Mohamed', 'Aïn Charchar', 'Ouled Attia', 'Salah Bouchaour', 'Aïn Zouit', 'Beni Bechir', 'Emdjez Edchich', 'Ouled Hedili', 'Bouchtata', 'Sidi Mezghiche', 'El Ghedir', 'Oued Zhour', 'Beni Zid', 'Fil Fila', 'Saf Saf', 'Essebt', 'Aïn Kechra', 'Beni Oulbane', 'Beni Ouelbane', 'Ramdan Djamel', 'Kanoua'] },
  'Sidi Bel Abbès':       { home: 900,  desk: 650,  baladiyas: ['Sidi Bel Abbès', 'Tessala', 'Aïn Thrid', 'Aïn Kada', 'Merine', 'Tilmouni', 'Mezaourou', 'Mostefa Ben Brahim', 'Sfisef', 'Sidi Chaib', 'Tenira', 'Aïn Adden', 'Ben Badis', 'Lamtar', 'Sidi Ali Benyoub', 'Sidi Ali Boussidi', 'Sidi Khaled', 'Tabia', 'Hassi Zahana', 'Badredine El Mokrani', 'Ras El Ma', 'Zerouala', 'Télagh', 'Boudjebha El Bordj', 'Sidi Dahou Des Zairs', 'Sidi Daho Des Zairs', 'Aïn Tindamine', 'Boukhanifis', 'Oued Taourira', 'Dhaya', 'Redjem Demouche', 'Mcid'] },
  'Annaba':               { home: 950,  desk: 700,  baladiyas: ['Annaba', 'Berrahal', 'El Hadjar', 'Chetaïbi', 'Aïn Berda', 'Oued El Aneb', 'El Bouni', 'Séraïdi', 'Treat'] },
  'Guelma':               { home: 950,  desk: 700,  baladiyas: ['Guelma', 'Nechmaya', 'Aïn Makhlouf', 'Aïn Ben Beida', 'Tamerdjant', 'El Fedjoudj', 'Hammam Debagh', 'Oued Zenati', 'Héliopolis', 'Bordj Sabat', 'Medjez Amar', 'Belkheïr', 'Bou Hachana', 'Tamlouka', 'Djeballah Khemissi', 'Ain Sandel', 'Ras El Agba', 'Khezaras', 'Bendjerrah', 'Boumahra Ahmed', 'Dahouara', 'Ain Larbi', 'Sidi Mezghiche', 'El Meridj', 'Hammam N\'Bails', 'Roknia', 'Sellaoua Announa', 'Beni Mezline', 'Medjez Sfa', 'Ain Ben Beida', 'Oued Fragha', 'Houari Boumediene'] },
  'Constantine':          { home: 950,  desk: 700,  baladiyas: ['Constantine', 'El Khroub', 'Aïn Abid', 'Beni Hamidane', 'Ouled Rahmoune', 'Aïn Smara', 'Hamma Bouziane', 'Didouche Mourad', 'Messoua', 'Ibn Ziad', 'Zighoud Youcef'] },
  'Médéa':                { home: 800,  desk: 550,  baladiyas: ['Médéa', 'Aïn Boucif', 'Aïn El Mediour', 'Aïn Ouksir', 'Aziz', 'Berrouaghia', 'Bir Ben Laabed', 'Boghar', 'Bou Aiche', 'Bouaichoune', 'Boughezoul', 'Bouskene', 'Chelalet El Adhaoura', 'Cheniguel', 'Derrag', 'Djouab', 'Draa Essamar', 'El Aissaouia', 'El Hamdania', 'El Omaria', 'Hannacha', 'Kef Lakhdar', 'Khams Djouamaa', 'Ksar El Boukhari', 'Maghraoua', 'Medjbar', 'Mezerana', 'Meftaha', 'Mihoub', 'Ouamri', 'Oued Harbil', 'Ouled Antar', 'Ouled Brahim', 'Ouled Deïd', 'Ouled Hellal', 'Ouled Maaref', 'Ouzera', 'Oum El Djalil', 'Rebaia', 'Saneg', 'Sedraia', 'Seghouane', 'Si Mahdjoub', 'Sidi Damed', 'Sidi Errabia', 'Sidi Naamane', 'Sidi Zahar', 'Souagui', 'Tablat', 'Tafraout', 'Tamesguida', 'Tizi Mahend', 'Titre', 'Zoubiria'] },
  'Mostaganem':           { home: 850,  desk: 600,  baladiyas: ['Mostaganem', 'Aïn Nouissy', 'Aïn Sidi Cherif', 'Aïn Tedles', 'Bouguirat', 'El Hassiane', 'Fornaka', 'Hadjadj', 'Hassi Mameche', 'Kheïr Eddine', 'Mansourah', 'Mazagran', 'Mesra', 'Mezeghrane', 'Nekmaria', 'Oued El Kheir', 'Ouled Boughalem', 'Ouled Maallah', 'Safsaf', 'Sayada', 'Sirat', 'Sidi Ali', 'Sidi Belattar', 'Sidi Lakhdar', 'Souaflia', 'Sour', 'Touahria', 'Zerga'] },
  "M'Sila":               { home: 900,  desk: 650,  baladiyas: ["M'Sila", 'Aïn El Hadjel', 'Aïn El Melh', 'Aïn Errich', 'Aïn Fares', 'Belaiba', 'Ben Srour', 'Beni Ilmane', 'Berhoum', 'Bir Foda', 'Boussaâda', 'Chellal', 'Dehahna', 'Djezaier Amar', 'El Hamel', 'El Houamed', 'Hammam Dalaa', 'Khettouti Sed El Djir', 'Khoubana', 'Maadid', 'Magra', 'Medjedel', 'Metarfa', 'Mohamed Boudiaf', 'Mtar', 'Ouanougha', 'Ouled Addi Guebala', 'Ouled Atia', 'Ouled Derradj', 'Ouled Mansour', 'Ouled Maaref', 'Ouled Sidi Ibrahim', 'Ouled Slimane', 'Sidi Aïssa', 'Sidi Ameur', 'Sidi Hadjeres', 'Sidi M\'Hamed', 'Slim', 'Souamaa', 'Tarmount', 'Zarzour'] },
  'Mascara':              { home: 850,  desk: 600,  baladiyas: ['Mascara', 'Aïn Fares', 'Aïn Fekan', 'Aïn Frass', 'Aïn Fares', 'Benian', 'Bou Hanifia', 'Bouhanifia', 'El Bordj', 'El Gaada', 'El Ghomri', 'El Keurt', 'Ferraguig', 'Froha', 'Gharrous', 'Ghriss', 'Guettena', 'Hacine', 'Khalouia', 'Maoussa', 'Matemore', 'Mocta Douz', 'Mohammadia', 'Nesmoth', 'Oggaz', 'Oued El Abtal', 'Oued Taria', 'Ouled Boussalem', 'Ouled Mimoun', 'Ras El Aïn Amirouche', 'Sidi Abdelmoumen', 'Sidi Boussaid', 'Sidi Kada', 'Tizi', 'Tighenif', 'Zahana'] },
  'Ouargla':              { home: 1100, desk: 800,  baladiyas: ['Ouargla', 'N\'Goussa', 'Rouissat', 'Ain Beida', 'Aïn El Beida', 'Bour El Haicha', 'Hassi Messaoud', 'Hassi Ben Abdallah', 'Megarine', 'Sidi Slimane', 'Sidi Khouiled', 'Témacine', 'Taibet', 'Tebesbest', 'Zaouia El Abidia'] },
  'Oran':                 { home: 900,  desk: 650,  baladiyas: ['Oran', 'Aïn El Turk', 'Aïn Kermes', 'Aïn Turk', 'Arzew', 'Ben Freha', 'Bethioua', 'Bir El Djir', 'Bousfer', 'Boufatis', 'Boutlelis', 'El Ancor', 'El Braya', 'Es Senia', 'Gdyel', 'Hassi Ben Okba', 'Hassi Mefsoukh', 'Marsat El Hadjadj', 'Misserghin', 'Mers El Kebir', 'Oued Tlelat', 'Sénia', 'Sidi Ben Yebka', 'Sidi Chami', 'Tafraoui', 'El Karma'] },
  'El Bayadh':            { home: 1000, desk: 750,  baladiyas: ['El Bayadh', 'Rogassa', 'Sidi Ameur', 'Boualem', 'El Abiodh Sidi Cheikh', 'Aïn El Orak', 'Ghassoul', 'Brezina', 'El Bnoud', 'Chellala', 'Bougtoub', 'Stitten', 'Kef El Ahmar', 'Mehara', 'Sidi Tifour', 'Tousmouline', 'Tiout', 'Labiodh Sidi Cheikh', 'Boussemghoun', 'Aïn Tarek', 'Bougtob', 'Krakda', 'El Hammamet'] },
  'Illizi':               { home: 1300, desk: 1000, baladiyas: ['Illizi', 'Djanet', 'In Amenas', 'Bordj Omar Driss'] },
  'Bordj Bou Arreridj':   { home: 850,  desk: 600,  baladiyas: ['Bordj Bou Arreridj', 'El Main', 'El Hamadia', 'El Achir', 'Aïn Taghrout', 'Mansourah', 'Bordj Ghebala', 'Tassamert', 'Tixter', 'Colla', 'Djaafra', 'Haraza', 'Hasnaoua', 'Khelil', 'Ksour', 'Medjana', 'Ouled Braham', 'Ouled Dahmane', 'Ouled Sidi Brahim', 'Rabta', 'Ras El Oued', 'Bir Kasdali', 'Tefreg', 'Teniet En Nasr', 'Togourt', 'Zammora'] },
  'Boumerdès':            { home: 750,  desk: 500,  baladiyas: ['Boumerdès', 'Boudouaou', 'Isser', 'Khemis El Khechna', 'El Kharrouba', 'Hammedi', 'Leghata', 'Thenia', 'Tidjelabine', 'Si Mustapha', 'Zemmouri', 'El Adjiba', 'Ammal', 'Bordj Menaïel', 'Baghlia', 'Sidi Daoud', 'Naciria', 'Djinet', 'Ouled Aïssa', 'Taourga', 'Ouled Moussa', 'Chabet El Ameur', 'Beni Amrane', 'Souk El Had', 'Corso', 'Dellys', 'Afir', 'Cap Djinet', 'Keddara'] },
  'El Tarf':              { home: 950,  desk: 700,  baladiyas: ['El Tarf', 'Ben Mehdi', 'Bouteldja', 'Vieux Lac', 'El Kala', 'Aïn El Assel', 'Souarekh', 'Zerizer', 'Berrihane', 'Cheffia', 'Asfour', 'Aïn Kerma', 'Lac Des Oiseaux', 'Dréan', 'Besbes', 'Hammam Beni Salah', 'Chefia', 'Aïn El Assel', 'Raml Souk', 'Oued Zitoun', 'Bougous'] },
  'Tindouf':              { home: 1300, desk: 1000, baladiyas: ['Tindouf', 'Oum El Assel'] },
  'Tissemsilt':           { home: 850,  desk: 600,  baladiyas: ['Tissemsilt', 'Ammari', 'Beni Chaïb', 'Beni Lahcene', 'Bordj Emir Abdelkader', 'Boucaid', 'El Brouj', 'Khemisti', 'Lazharia', 'Lardjem', 'Layoune', 'Maâlel', 'Melaab', 'Ouled Bessem', 'Sidi Boutouchent', 'Sidi Lantri', 'Sidi Slimane', 'Tamalaht', 'Theniet El Had', 'Youssoufia'] },
  'El Oued':              { home: 1100, desk: 800,  baladiyas: ['El Oued', 'Robbah', 'Oued El Alenda', 'Bayadha', 'Nakhla', 'Guemar', 'Kouinine', 'Reguiba', 'Hamraia', 'Taghzout', 'Debila', 'Hadjira', 'Still', 'Mih Ouansa', 'El Mghair', 'El Ogla', 'Sidi Aoun', 'Trifaoui', 'Magrane', 'Beni Guecha', 'Ourmas'] },
  'Khenchela':            { home: 950,  desk: 700,  baladiyas: ['Khenchela', 'Babar', 'Baghaï', 'El Hamma', 'Kais', 'Chechar', 'M\'sara', 'Djellal', 'Ensigha', 'Bouhmama', 'El Oueldja', 'Taouzient', 'Aïn Touila', 'Tamza', 'Remila', 'Ouled Rechache', 'Chelia', 'El Mahmel'] },
  'Souk Ahras':           { home: 950,  desk: 700,  baladiyas: ['Souk Ahras', 'Sedrata', 'Hanancha', 'Mechroha', 'Aïn Soltane', 'Ouled Driss', 'Tiffech', 'Bir Bouhouche', 'Merahna', 'Aïn Zana', 'Aïn Abessa', 'Dréa', 'M\'Daourouch', 'Ouled Moumen', 'Sidi Fredj', 'Taoura', 'Zaarouria', 'Khedara', 'Oued Keberit', 'Khemissa', 'Safel El Ouiden', 'Ragouba', 'Oum El Adhaim'] },
  'Tipaza':               { home: 750,  desk: 500,  baladiyas: ['Tipaza', 'Koléa', 'Aïn Tagourait', 'Cherchell', 'Hadjout', 'Gouraya', 'Nador', 'Bou Ismaïl', 'Ahrbal', 'Aïn Benian', 'Fouka', 'Bou Haroun', 'Meurad', 'Chaiba', 'El Nador', 'Larhat', 'Sidi Rached', 'Bourkika', 'Khemisti', 'Aghbal', 'Damous', 'Menacer', 'Sidi Ghiles', 'Messelmoun', 'Aïn Tagourait', 'Bou Ismail', 'Attatba', 'Boufarik', 'Sidi Semiane'] },
  'Mila':                 { home: 900,  desk: 650,  baladiyas: ['Mila', 'Ferdjioua', 'Chelghoum Laïd', 'Ain Tine', 'Aïn Beïda Harriche', 'Rouached', 'Grarem Gouga', 'Tadjenanet', 'El Mechira', 'Benyahia Abderrahmane', 'Ain El Bel', 'Oued Athmania', 'Aïn Mellouk', 'Oued Seguen', 'El Ayadi Barbes', 'Terrai Baïnen', 'Sidi Merouane', 'Tiberguent', 'Bouhatem', 'Tassadane Haddada', 'Yahia Beni Guecha', 'Ahmed Rachedi'] },
  'Aïn Defla':            { home: 800,  desk: 550,  baladiyas: ['Aïn Defla', 'El Abadia', 'Aïn Lechiekh', 'Bourached', 'Mekhatria', 'El Hoceinia', 'Hammam Righa', 'Tachta Zougagha', 'Bir Ould Khelifa', 'Sidi Lakhdar', 'Bathia', 'Djendel', 'Aïn Torki', 'El Amra', 'Aïn Soltane', 'Hoceinia', 'Rouina', 'Tarik Ibn Ziad', 'Zeddine', 'Beni Slimane', 'Bordj Emir Khaled', 'Chorfa', 'Arib', 'El Hassania', 'Khemis Miliana', 'Oued Djemaa', 'Oued Chorfa', 'Aïn Bénian', 'Miliana', 'Tiberkanine', 'Boumedfaa', 'Djebilet Rosfa', 'Djelida', 'Aïn Lechiakh', 'Aïn Hamara', 'Tachta Zouagha'] },
  'Naâma':                { home: 1000, desk: 750,  baladiyas: ['Naâma', 'Mécheria', 'Aïn Sefra', 'Tiout', 'Sfissifa', 'Moghrar', 'Asla', 'Djeniene Bourezg', 'El Biod', 'Kasdir', 'El Khitoune'] },
  'Aïn Témouchent':       { home: 900,  desk: 650,  baladiyas: ['Aïn Témouchent', 'Aïn Kihal', 'Beni Saf', 'Hammam Bou Hadjar', 'El Amria', 'Oulhaça El Gheraba', 'El Malah', 'Terga', 'Sidi Ben Adda', 'Meslem', 'Aïn El Arbaa', 'Sidi Safi', 'Aghlal', 'El Emir Abdelkader', 'Ouled Boudjemaa', 'Oued Berkeche', 'Chaabat El Leham', 'Hassasna', 'Aoubellil', 'Tadmait', 'Benazzouz', 'El Ghabri'] },
  'Ghardaïa':             { home: 1100, desk: 800,  baladiyas: ['Ghardaïa', 'Noumerate', 'El Guerrara', 'Berriane', 'Metlili', 'El Atteuf', 'Bounoura', 'Aïn El Hadjadj', 'Dhayet Ben Dhahoua', 'Zelfana', 'Sebseb', 'Mansoura', 'Hassi Fehal', 'Hassi Gara'] },
  'Relizane':             { home: 850,  desk: 600,  baladiyas: ['Relizane', 'Aïn Rahma', 'Aïn Tarek', 'Ammi Moussa', 'Bendaoud', 'Beni Dergoun', 'Beni Zentis', 'Dar Ben Abdellah', 'Djidioua', 'El Hamadna', 'El Hassi', 'El Matmar', 'El Ouldja', 'Hamri', 'Hassi Daho', 'Kalaa', 'Lahlef', 'Mazouna', 'Mendes', 'Merdja Sidi Abed', 'Oued El Djemaa', 'Oued Rhiou', 'Ouled Sidi Mihoub', 'Ramka', 'Sidi Khettab', 'Sidi Lazreg', 'Sidi M\'Hamed Ben Aouda', 'Sidi M\'Hamed Ben Ali', 'Sidi Saada', 'Souk El Had', 'Yellel', 'Zmalet El Emir Abdelkader'] },
  'Timimoun':             { home: 1200, desk: 900,  baladiyas: ['Timimoun', 'Aougrout', 'Talmine', 'Ouled Saïd', 'Charouine', 'Fenoughil', 'Tinerkouk', 'Deldoul', 'Aït Slimane', 'Metarfa', 'Ksar Kaddour'] },
  'Bordj Badji Mokhtar':  { home: 1300, desk: 1000, baladiyas: ['Bordj Badji Mokhtar', 'Timiaouine'] },
  'Ouled Djellal':        { home: 1000, desk: 750,  baladiyas: ['Ouled Djellal', 'Sidi Khaled', 'Ras El Miaad', 'El Ghrous', 'Chaiba', 'Doucen'] },
  'Béni Abbès':           { home: 1200, desk: 900,  baladiyas: ['Béni Abbès', 'El Ouata', 'Tabelbala', 'Tamtert', 'Igli', 'Kerzaz', 'Erg Ferradj', 'Ouled Khoudir'] },
  'In Salah':             { home: 1300, desk: 1000, baladiyas: ['In Salah', 'Foggaret Ez Zoua', 'In Ghar', 'Aoulef', 'Aougrout', 'Tit', 'Reggane'] },
  'In Guezzam':           { home: 1300, desk: 1000, baladiyas: ['In Guezzam', 'Tin Zaouatine'] },
  'Touggourt':            { home: 1100, desk: 800,  baladiyas: ['Touggourt', 'Temacine', 'Blidet Amor', 'El Hadjira', 'Nezla', 'Sidi Slimane', 'Megarine', 'Benaceur', 'Zaouia El Abidia'] },
  'Djanet':               { home: 1300, desk: 1000, baladiyas: ['Djanet', 'Bordj El Haouès'] },
  "El M'Ghair":           { home: 1100, desk: 800,  baladiyas: ["El M'Ghair", 'Djamaa', 'Sidi Khellil', 'Tendla', 'El Hadjira', 'Still', 'Oum Touyour'] },
  'El Meniaa':            { home: 1200, desk: 900,  baladiyas: ['El Meniaa', 'Hassi Gara', 'Issameur', 'In Tarek', 'Boutte El Baguel'] },
  'Aflou':                { home: 950,  desk: 700,  baladiyas: ['Aflou', 'Aïn Madhi', 'Tadjemout', 'Taouiala', 'Aïn Sidi Ali', 'Brida', 'El Ghicha', 'Kheneg', 'Oued Morra', 'Sidi Bouzid'] },
  'El Abiodh Sidi Cheikh':{ home: 1000, desk: 750,  baladiyas: ['El Abiodh Sidi Cheikh', 'Boussemghoun', 'Aïn El Orak', 'Stitten', 'Mehara', 'Tiout'] },
  'El Aricha':            { home: 950,  desk: 700,  baladiyas: ['El Aricha', 'Aïn Ferrak', 'Beni Smiel', 'Souk Tleta', 'Aïn Kebira', 'El Gor', 'Sidi Djillali'] },
  'El Kantara':           { home: 950,  desk: 700,  baladiyas: ['El Kantara', 'Branis', 'Aïn Zaatout', 'El Haouch', 'M\'Chouneche'] },
  'Barika':               { home: 900,  desk: 650,  baladiyas: ['Barika', 'Aïn Djasser', 'Ouled Ammar', 'Ouled Aouf', 'Seggana', 'Hidoussa', 'Teniet El Abed'] },
  'Bou Saâda':            { home: 900,  desk: 650,  baladiyas: ['Bou Saâda', 'Aïn El Hadjel', 'El Hamel', 'Ouled Sidi Ibrahim', 'Sidi Aïssa', 'Hammam Dalaa'] },
  'Bir El Ater':          { home: 950,  desk: 700,  baladiyas: ['Bir El Ater', 'Cheria', 'El Aouinet', 'Negrine', 'Safsaf El Ouesra'] },
  'Ksar El Boukhari':     { home: 850,  desk: 600,  baladiyas: ['Ksar El Boukhari', 'Boghar', 'Boughezoul', 'Aïn Boucif', 'Saneg', 'Oum El Djalil'] },
  'Ksar Chellala':        { home: 850,  desk: 600,  baladiyas: ['Ksar Chellala', 'Rahouia', 'Sougueur', 'Mehdia', 'Aïn El Hadid'] },
  'Aïn Oussera':          { home: 800,  desk: 550,  baladiyas: ['Aïn Oussera', 'Birine', 'Hassi Bahbah', 'Benhar', 'El Azizia'] },
  'Messaad':              { home: 950,  desk: 700,  baladiyas: ['Messaad', 'Douis', 'Had Sahary', 'El Guedid', 'Deldoul', 'Hassi El Euch'] },
}

  let deliveryPrice = 0
if (data.wilaya && data.delivery_type) {
    if (data.delivery_type === 'home') {
        deliveryPrice = wilayas[data.wilaya].home
    } else {
        deliveryPrice = wilayas[data.wilaya].desk
    }
}

    const total = (price * data.quantity) + deliveryPrice

    return (
    <>
        <Header />
        <div className="form-page">
          {allImages.length > 0 && (
    <div className="slider">
        <img
            src={`/storage/${allImages[currentSlide]}`}
            alt={product.name}
            className="displaySlide"
        />
        {allImages.length > 1 && (
            <>
                <button className="prev" type="button" onClick={prevSlide}>&#8250;</button>
                <button className="next" type="button" onClick={nextSlide}>&#8249;</button>
            </>
        )}
    </div>
)}

            <div className="form-container">
                {product && (
                    <>
                        <h1 className="form-title">{product.name}</h1>
                        <p className="form-prix"><strong>{product.price}DA</strong></p>
                        <p className="card-description">{product.description}</p>

                        <div className="form-field">
                         <label>الألوان</label>
                         <div className="color-options">

                         <div>
                           <input type="radio" id="color-noir" name="color" value="Noir"
                             checked={data.color === 'Noir'}
                             onChange={e => setData('color', e.target.value)} />
                               <label htmlFor="color-noir" className="color-circle color-noir"></label>
                            </div>

                           <div>
                             <input type="radio" id="color-blanc" name="color" value="Blanc"
                               checked={data.color === 'Blanc'}
                               onChange={e => setData('color', e.target.value)} />
                             <label htmlFor="color-blanc" className="color-circle color-blanc"></label>
                          </div>

                        </div>

                       </div>


                        <div className="form-field">
                        <label>Taille / المقاسات</label>
                         <div className="size-options">
                          <div>
                         <input type="radio" id="size-XS" name="size" value="XS"
                            checked={data.size === 'XS'}
                           onChange={e => setData('size', e.target.value)} />
                           <label htmlFor="size-XS" className="size-pill">XS</label>
                           </div>
   

                     <div>
                     <input type="radio" id="size-S" name="size" value="S"
                      checked={data.size === 'S'}
                      onChange={e => setData('size', e.target.value)} />
                      <label htmlFor="size-S" className="size-pill">S</label>
                    </div>

                     <div>
                     <input type="radio" id="size-M" name="size" value="M"
                       checked={data.size === 'M'}
                       onChange={e => setData('size', e.target.value)} />
                      <label htmlFor="size-M" className="size-pill">M</label>
                     </div>

                     <div>
                     <input type="radio" id="size-L" name="size" value="L"
                      checked={data.size === 'L'}
                    onChange={e => setData('size', e.target.value)} />
                      <label htmlFor="size-L" className="size-pill">L</label>
                   </div>

                     <div>
                     <input type="radio" id="size-XL" name="size" value="XL"
                      checked={data.size === 'XL'}
                       onChange={e => setData('size', e.target.value)} />
                     <label htmlFor="size-XL" className="size-pill">XL</label>
                  </div>

                   <div>
                    <input type="radio" id="size-XXL" name="size" value="XXL"
                     checked={data.size === 'XXL'}
                    onChange={e => setData('size', e.target.value)} />
                      <label htmlFor="size-XXL" className="size-pill">XXL</label>
                        </div>

                        </div>
                       </div>
                    </>
                )}

                <p className="form-article">Remplissez le formulaire</p>

                {wasSuccessful && (
                    <p className="form-success">Votre commande a été envoyée avec succès!</p>
                )}

                <form onSubmit={handleSubmit}>
                  

                    <div className="form-field">
                        <label>Article:</label>
                        <input required type="text" value={data.article_name} onChange={e => setData('article_name', e.target.value)} />
                    </div>

                    <div className="form-field">
                        <label>Nom et Prénom:</label>
                        <input required type="text" value={data.name} onChange={e => setData('name', e.target.value)} />
                    </div>

                    <div className="form-field">
                        <label>Numéro de téléphone:</label>
                        <input required type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                    </div>

                   <div className="form-field">
                  <label>Wilaya:</label>
                 <select required value={data.wilaya} onChange={e => {
                setData('wilaya', e.target.value)
               setData('baladiya', '')
                }}>
                <option value="">Choisir une wilaya</option>
                 {Object.keys(wilayas).map((wilaya, index) => (
                <option key={index} value={wilaya}>{wilaya}</option>
               ))}
               </select>
             </div>

             {data.wilaya && (
             <div className="form-field">
            <label>Baladiya:</label>
              <select required value={data.baladiya} onChange={e => setData('baladiya', e.target.value)}>
               <option value="">Choisir une baladiya</option>
               {wilayas[data.wilaya].baladiyas.map((baladiya, index) => (
              <option key={index} value={baladiya}>{baladiya}</option>
              ))}
             </select>
              </div>
               )}


                     <div className="form-field">
                     <p className="form-radio-label">مكان التوصيل</p>

                     <div className="radio-option">
                    <label htmlFor="delivery_home">للمنزل</label>
                   <input type="radio" id="delivery_home" name="delivery_type" value="home"
                    checked={data.delivery_type === 'home'}
                    onChange={e => setData('delivery_type', e.target.value)} />
                   </div>

                   <div className="radio-option">
                    <label htmlFor="delivery_desk">لمكتب التوصيل</label>
                    <input type="radio" id="delivery_desk" name="delivery_type" value="desk"
                     checked={data.delivery_type === 'desk'}
                    onChange={e => setData('delivery_type', e.target.value)} />
                    </div>
                   </div>


                    <div className="form-field">
                        <label>Adresse complète:</label>
                        <input required type="text" value={data.address} onChange={e => setData('address', e.target.value)} />
                    </div>

                     <div className="form-field">
                    <label>Quantité:</label>
                     <div className="quantity-options">
                      <button type="button" className="quantity-btn"
                       onClick={() => setData('quantity', Math.max(1, data.quantity - 1))}>
                         -
                     </button>
                    <span className="quantity-value">{data.quantity}</span>
                    <button type="button" className="quantity-btn"
                      onClick={() => setData('quantity', Math.min(5, data.quantity + 1))}>
                        +
                   </button>
                  </div>
                   </div>

                    <div className="form-summary">
                        <p className="form-summary-row">Prix: {price}DA x {data.quantity} = {price * data.quantity}DA</p>
                        <p className="form-summary-row">Livraison: {deliveryPrice}DA</p>
                        <p className="form-summary-total">Total: {total}DA</p>
                    </div>

                    <button type="submit" className="btn-confirmer">Confirmer ma commande</button>
                </form>

                {errors.name && <p className="form-error">{errors.name}</p>}
                {errors.quantity && <p className="form-error">{errors.quantity}</p>}
                {errors.phone && <p className="form-error">{errors.phone}</p>}
                {errors.wilaya && <p className="form-error">{errors.wilaya}</p>}
                {errors.delivery_type && <p className="form-error">{errors.delivery_type}</p>}
                {errors.address && <p className="form-error">{errors.address}</p>}
            </div>
      </div>
    </>
)
}