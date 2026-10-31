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
      bio: "Some scholars distinguish themselves through the knowledge they create; others through the institutions they build. Professor Francis Adegbaye Igbasan belongs to the distinguished company of those who do both.\n\nAn accomplished scholar of international repute, registered Animal Scientist, prolific researcher, and seasoned university administrator, Professor Igbasan brings over three decades of experience in teaching, research, academic development, and university administration. He is the second substantive Vice-Chancellor of McPherson University, Seriki Sotayo, Ogun State, where his tenure has been marked by remarkable institutional growth and purposeful transformation.\n\nUnder his watch, McPherson University has moved from an enrolment of 435 students to over 3,500 – a remarkable expansion of more than eightfold. Beyond the numbers, his administration has enriched the academic curriculum, introduced modern infrastructure, and commissioned over 14 strategic development projects. These are not merely statistics; they represent expanded opportunities for young people, improved facilities for teaching and learning, and a stronger institutional foundation for the generations to come. His vision is reflected not only in what has been built, but also in the growing number of lives the University is positioned to transform.\n\nHis credentials are as impressive as his accomplishments. Professor Igbasan holds a Ph.D. in Animal Science from the University of Manitoba, Winnipeg, Canada; an M.Sc. in Animal Science from the University of Ibadan; and a B.Tech. in Animal Production and Health from the Federal University of Technology, Akure. He attained the rank of Professor at FUTA in 2013 and subsequently served as Deputy Vice-Chancellor of Olusegun Agagu University of Science and Technology.\n\nA researcher whose work has crossed academic and international boundaries, he has published over 60 scientific articles, supervised numerous postgraduate scholars, and attracted prestigious international research opportunities, including the highly competitive Alexander von Humboldt Research Fellowship in Germany. His contributions extend beyond publications to mentoring the next generation of researchers and advancing scientific knowledge.\n\nHis passion for quality and excellence is also reflected in his professional training as an academic program and institutional accreditor through the National Universities Commission, the National Open University of Nigeria, and the African Quality Assurance Network. This grounding reinforces his commitment to academic standards, institutional accountability, and continuous improvement.\n\nYet, beyond the titles, publications, projects, and professional distinctions lies a man whose character has earned recognition in its own right. The Guardian Newspaper named him among its 50 Nigerians with Integrity in Leadership. He is also a recipient of the All-African Students Union African Leadership Award and productivity honours from his alma mater, FUTA.\n\nFrom the laboratories of scientific research to the corridors of university administration, from mentoring postgraduate scholars to expanding the frontiers of institutional development, Professor Francis Adegbaye Igbasan has demonstrated that true distinction is measured not simply by positions attained, but by the positive difference made.\n\nHe is a scholar whose knowledge informs progress, an administrator whose vision produces measurable results, and a man whose integrity gives meaning to achievement. His enduring contribution lies not merely in the institutions he has served, but in the opportunities he has created, the lives he has influenced, and the future he continues to help shape.\n\nMcU celebrates Professor Francis Adegbaye Igbasan – an accomplished academic, a distinguished university administrator, and a worthy ambassador of excellence and integrity."
    },
    {
      id: "adekola",
      role: "Keynote Speaker",
      name: "Dr. Bola Adekola",
      postnominals: "FCIA, FCIDA, FSM",
      title: "Pioneer Registrar, Fountain University; former Registrar, FUNAAB; former Secretary-General, ARNU",
      photo: "assets/img/adekola-2.jpg",
      bio: "Dr. ‘Bola Adekola is a seasoned university administrator, researcher and institutional leader with over three decades of experience in university administration, spanning Nigeria’s public, private and federal university systems. His distinguished career includes rising through the ranks at Olabisi Onabanjo University, serving as Pioneer Registrar of Fountain University between 2007 and 2012, and as the 4th substantive Registrar of the Federal University of Agriculture, Abeokuta (FUNAAB), where he served from 2017 to 2023. He also served as Secretary-General of the Association of Registrars of Nigerian Universities, contributing to professional leadership beyond his institution.\n\nA Researcher in Personnel Management and Psychology and holder of a PhD in Personnel Psychology, Dr. Adekola has worked across several critical areas of university administration, including Faculty administration, Postgraduate School, Academic Planning, Senate Affairs and Council Affairs, amongst others. This breadth of exposure across different institutional settings has given him a practical understanding of the people, policies, processes, and resources that drive university administration.\n\nAn astute manager of men, materials and money and an award-winning professional, he is particularly recognised for combining administrative experience with people-centred leadership, professional discipline and institutional responsibility.\n\nHis professional journey began in 1990 as a Social Mobilisation Officer with MAMSER before he moved into university administration. From Administrative Officer to Pioneer Registrar and yet another Registrarship position, his progression reflects experience earned across the full spectrum of university administration.\n\nYet, perhaps the most compelling part of his story is where it began. Having lost both parents at an early age, he worked menial jobs, including farm work and teaching, to support his education. From Lukogbe in Ogun Waterside to the highest levels of university administration, his journey is a powerful testament to the transformative potential of education, resilience, and purposeful service.\n\nWith experience across three university ownership structures (private, state and federal), national professional leadership and multiple areas of university administration, Dr. Adekola brings to the Registry Lecture not merely theory, but practical experiences and lessons drawn from more than three decades in the field.\n\nHis enduring philosophy is simple: tough times do not last; with education, hard work, integrity, discipline and the right attitude, people can rise beyond their circumstances and institutions can rise to meet their purpose.\n\nBeyond these, Dr. Adekola enjoys being the husband of Oluwakemi Adekola, a Professor of Language Education at Fountain University, Osogbo, and they are blessed with lovely children and grandchildren."
    },
    {
      id: "babalola",
      role: "Guest Lecturer",
      name: "Dr. Grace Olubunmi Babalola Esq.",
      postnominals: "FCIA, FCIPM, FIPMLD",
      title: "Registrar, Adekunle Ajasin University",
      photo: "assets/img/babalola-3.jpg",
      bio: null
    },
    {
      id: "abegunde",
      role: "Special Guest of Honour",
      name: "Elder Adebola Abegunde Esq.",
      postnominals: "",
      title: "Pioneer Registrar, McPherson University; former Registrar, University of Lagos",
      photo: "assets/img/abegunde.jpg",
      bioTitle: "A pioneer, administrator, legal practitioner and mother to many",
      bio: "Mrs. Adebola Abegunde was appointed the Pioneer Registrar of McPherson University (McU) in 2012, at a time when there was no staff in place.\n\nHer appointment was a clear recognition of her wealth of administrative experience, sound judgement and proven leadership.\n\nAs the University’s first Registrar, she could not simply step into an established office; rather, she helped build it by laying the administrative foundation of the University, overseeing Registry operations and implementing the systems and processes that supported academic governance, student records, and institutional compliance. She served with distinction until the completion of her tenure in 2017, leaving behind a legacy that remains part of the University’s institutional history.\n\nA distinguished academic administrator and legal practitioner, Mrs. Abegunde has almost five decades of service to education in Nigeria. She began her professional career at the Federal Ministry of Education, where she served from 1972 to 1978, before joining the University of Lagos in March 1978 and serving until her retirement.\n\nHer academic journey reflects the same commitment to growth and versatility that has marked her professional life. She obtained a Bachelor of Arts in Education (B.A. Ed.) from the University of Ife in 1972, followed by a Master of Science in Industrial Relations and Personnel Management from the University of Lagos in 1985.\n\nNot content to rest on her achievements, she later ventured into the legal profession, earning an LL.B. from the University of Lagos in 1992 and being called to the Nigerian Bar in 1993 after completing her professional training at the Nigerian Law School.\n\nShe rose through the ranks at the Registry until she was appointed the substantive Registrar of the University of Lagos in 2005, a position she held until 2007.\n\nIn May 2007, just two months before she retired from the University of Lagos, Mrs Abegunde was appointed a member of the Foursquare University Establishment Committee. She was appointed Secretary of the Committee, a position she held until February 2012, when the Church obtained the license to establish McPherson University.\n\nA fellow and member of several professional bodies, she has attended several courses at home and abroad.\n\nMrs. Abegunde has been much more than an administrator. To many, especially at McPherson University, she has been a mentor, role model, philanthropist, and mother.\n\nThe kindness of our Amazon has often been expressed in very practical ways. Pioneer female staff members will remember the warmth and thoughtfulness behind the goodie bags of disposable diapers and assorted baby items she gave whenever a staff member welcomed a new baby.\n\nThese were small gestures, perhaps, but they spoke loudly about the kind of leader she was: one who noticed people, celebrated their joys, and cared about their lives beyond the workplace.\n\nHer commitment to McPherson University went beyond her official tenure. Since the University’s inception, she has made a wing of her twin flat at the Ajebo Camp available to a University staff member at no cost, an enduring gesture of support that reflects a deep personal commitment to the institution she helped build.\n\nA virtuous wife, mother, and grandmother, Mrs. Abegunde’s story is therefore not only about positions held or years of service. It is about building, serving, giving, and leaving people better than she met them.\n\nAs McU honours those who leave their footprints on the University, it celebrates Mrs. Abegunde, a mother whose name is woven into its beginnings, a pioneer Registrar who helped give McPherson University its administrative footing, and a trailblazer whose professional excellence was matched by generosity, warmth, and genuine care for people."
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
  ],

  /* 2025 & 2026 Registry Lecture Local Organising Committee.
     Add one entry per member. `linkedin` is optional; with it, the name becomes a link.
     e.g. { name: "Mr. John Doe", role: "Chairman", linkedin: "https://www.linkedin.com/in/..." } */
  committee: [
    { name: "Mr. Tokunbo Olakunle", role: "Chairman", linkedin: null },
    { name: "Mr. Ayodeji Adesina", role: "Member", linkedin: null },
    { name: "Mrs. Omowunmi Fagbohun", role: "Member", linkedin: null },
    { name: "Mr. Benjamin Edison", role: "Member", linkedin: null },
    { name: "Mr. Isaac Merayebu", role: "Member", linkedin: null },
    { name: "Mrs. Nike Adesida", role: "Member", linkedin: null },
    { name: "Mrs. Funmilayo Adesina", role: "Co-opted Member", linkedin: null },
    { name: "Dr. Mrs. Oluwatoyin Yalumo", role: "Co-opted Member", linkedin: null },
    { name: "Ms. Oluwaseun Akindele", role: "Co-opted Member", linkedin: null },
    { name: "Mr. Abiola Oduyemi", role: "Co-opted Member", linkedin: null },
    { name: "Mr. Oluwaseyi Ojo", role: "Secretary", linkedin: null }
  ],
  committeeRetired: [
    { name: "Late Ms. Nengi Kalio", note: "Membership retired following her transition." }
  ],

  // Maiden (1st) Registry Lecture, 2025
  maiden: {
    date: "Thursday 17 July 2025",
    venue: "Multipurpose Hall, McPherson University",
    theme: "Challenges of University Administration in Nigeria and the Registry on a Rescue Mission",
    albumUrl: "https://photos.app.goo.gl/1iT9PgUAgVfLUFKK9",
    // first photo is shown large
    photos: [
      { src: "assets/img/2025/group", caption: "Registry staff and guests after the maiden Registry Lecture" },
      { src: "assets/img/2025/lecturer", caption: "The Guest Lecturer at the podium" },
      { src: "assets/img/2025/award", caption: "Presentation of the 2025 Excellence Award to the Guest Lecturer" },
      { src: "assets/img/2025/high-table", caption: "Greetings at the high table" },
      { src: "assets/img/2025/audience", caption: "Guests in the Multipurpose Hall" }
    ]
  }
};
