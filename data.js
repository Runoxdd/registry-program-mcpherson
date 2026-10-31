/*
  All event content lives here. Edit this file to update the site:
  - add a speaker bio: set `bio` to a string (paragraphs separated by \n\n)
  - add the online link: set `onlineUrl`
  Times are West Africa Time (WAT, UTC+1).
*/
window.EVENT = {
  university: "McPherson University",
  lectureTitle: "2nd Annual Registry Lecture",
  weekTitle: "1st Registry Week",
  theme: "The Smart Registry",
  subtheme: "Leveraging AI for Efficiency, Compliance & Service Delivery",

  lectureDate: "2026-11-19",
  lectureStart: "2026-11-19T10:00:00+01:00",

  venue: "500-Seater Ultra-modern Lecture Theatre",
  venueDetail: "McPherson University, Seriki Sotayo, Ogun State",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=McPherson+University%2C+Km+75+Lagos-Ibadan+Expressway%2C+Ogun+State",

  registerUrl: "https://forms.gle/UkVdwtavHwdT3KCn9",
  onlineUrl: null, // TODO: Zoom / YouTube link for this year's lecture
  pastLectureUrl: "https://youtu.be/PUhL5goij88", // maiden (1st) Annual Registry Lecture
  email: "registrar@mcu.edu.ng",

  // Same order as the flier
  speakers: [
    {
      id: "igbasan",
      role: "Chief Host & Chairman",
      name: "Prof. Francis Igbasan",
      postnominals: "RAS, FAvH, MNIAS, MWARIMA",
      title: "Vice-Chancellor, McPherson University",
      photo: "assets/img/igbasan-2.jpg",
      bio: null
    },
    {
      id: "adekola",
      role: "Keynote Speaker",
      name: "Dr. Bola Adekola",
      postnominals: "FCIA, FCIDA, FSM",
      title: "Pioneer Registrar, Fountain University; former Registrar, FUNAAB; former Secretary-General, ARNU",
      photo: "assets/img/adekola-2.jpg",
      bio: null
    },
    {
      id: "babalola",
      role: "Guest Lecturer",
      name: "Dr. Grace Olubunmi Babalola Esq.",
      postnominals: "FCIA, FCIPM, FIPMLD",
      title: "Registrar, Adekunle Ajasin University",
      photo: "assets/img/babalola-2.jpg",
      bio: null
    },
    {
      id: "abegunde",
      role: "Special Guest of Honour",
      name: "Elder Adebola Abegunde Esq.",
      postnominals: "",
      title: "Pioneer Registrar, McPherson University; former Registrar, University of Lagos",
      photo: "assets/img/abegunde.jpg",
      bio: null
    },
    {
      id: "alawode",
      role: "Host",
      name: "Emi' Alawode",
      postnominals: "FISOC, FICAN, MAHEP",
      title: "Registrar, McPherson University",
      photo: "assets/img/alawode.jpg",
      bio: null
    }
  ]
};
