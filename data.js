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
      // the name links here
      link: { label: "LinkedIn", url: "https://www.linkedin.com/in/ejalawodetech/" },
      // extra links shown in the biography pop-up
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/ejalawodetech/" },
        { label: "Profile on mcu.edu.ng", url: "https://mcu.edu.ng/main/faculty-members/mrs-emi-alawode/" }
      ],
      bio: "Emi’ Alawode, the current Registrar of McPherson University, is a dedicated higher education administrator, communicator, and mentor with more than three decades of professional experience. She has served in various key leadership roles across academic administration, human resources, and public relations.\n\nAt the Federal University of Agriculture, Abeokuta (FUNAAB), she pioneered the use of e-meeting folders for the Appointments and Promotions Committee, improving efficiency and reducing paper use. She also redesigned the University-wide Bulletin and introduced College Bulletins to strengthen internal communication.\n\nWhile on sabbatical as Visiting Deputy Registrar at McPherson University, she launched the University’s first news bulletin, MCU Echo, setting the pace for structured campus information sharing.\n\nA World Pulse Digital Changemaker and a Powershift Inclusive Excellence (PIE) group member, she actively contributes to policies affecting over 80,000 women worldwide. She is also a proud member of communities like Lean In, Bloom, Women Techmakers, and Toastmasters, continuously learning and helping others grow. She has directly and indirectly trained and guided 7,500+ women and girls in leadership, communication, and digital skills programs as a mentor and coach.\n\nMrs. Alawode is a multi-fellow awardee of organisations including the Netherlands Universities Foundation for International Cooperation, the Internet Society, and the Every Woman Treaty. She has spoken at major international events such as Women in Tech, Aspire Global Unity, and the Women Leaders in Higher Education summit, reaching audiences in 30+ countries with insights into technology, women's empowerment, and cross-cultural communication.\n\nCurrently researching how women in Southwestern Nigeria use WhatsApp for business, shedding light on how digital tools shape economic opportunities, Alawode is deeply committed to mentoring young people, particularly women, and co-convenes EmpowHer, a platform dedicated to equipping African female undergraduates with leadership and career skills. Mrs. Alawode has shaped narratives, amplified voices, and driven impact in media, academia, and digital communities for over 20 years, including serving as a Volunteer Director of Women Who Code in Barcelona, Spain.\n\nHaving travelled to nearly every continent, she brings a broad perspective on higher education administration, culture, communication, and global challenges."
    }
  ]
};
