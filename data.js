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
  // Figures in the strip at the bottom of the hero. Edit freely.
  stats: [
    { value: "500", label: "Seats in the Lecture Theatre", note: "Plus participants online" },
    { value: "5", label: "Days of Registry Week", note: "16 to 20 November 2026" },
    { value: "30+", label: "Years of Registry Experience", note: "From Leading Professionals" },
    { value: "Maiden", label: "Registry Week", note: "A first for McPherson University" }
  ],

  // Short line under "Introducing the McU Registry Social Impact Awards"
  awardsNote: null,

  /* 30-second promo video for this year's lecture.
     Leave mp4 as null to show the "coming soon" frame.
     mp4: H.264/AAC MP4, ideally 1080p or 720p and under ~10 MB.
     poster: a still image shown before the video plays.
     captions: optional WebVTT (.vtt) file if the video has speech. */
  promoVideo: { mp4: "assets/video/registry-lecture-2026.mp4", poster: "assets/video/poster.jpg", captions: null, ratio: "16 / 9" },

  pastLectureUrl: "https://youtu.be/PUhL5goij88", // maiden (1st) Annual Registry Lecture
  email: "registrar@mcu.edu.ng",
  whatsapp: { display: "+234 704 563 1138", number: "2347045631138" }, // chat only, no calls

  /* Registry Week programme, day by day. Times are WAT (24-hour "HH:MM").
     by: who runs the session (optional). highlight: true marks the lecture. */
  schedule: [
    { date: "2026-11-16", sessions: [
      {"start": "08:00", "end": "08:30", "title": "Opening Dew", "venue": "Stephen & Hannah Obaro Multipurpose Hall"},
      {"start": "08:30", "end": "09:30", "title": "Aerobics Session / Interactive Campus Awareness Walk", "venue": "McU Campus"}
    ] },
    { date: "2026-11-17", sessions: [
      {"start": "09:00", "end": "10:30", "title": "The Smart University Registry: Using AI, Digital Workflows and Data to Work Faster, Serve Better and Make Smarter Decisions", "venue": "Council/Senate Chamber", "by": "Cubbes"},
      {"start": "12:30", "end": "14:00", "title": "Artificial Intelligence for Work & Business I", "venue": "New Horizon Computer Laboratory, Stephen & Hannah Obaro Multipurpose Hall", "by": "New Horizon", "byUrl": "https://www.newhorizonsnigeria.com.ng/"}
    ] },
    { date: "2026-11-18", sessions: [
      {"start": "09:00", "end": "10:30", "title": "Artificial Intelligence for Work & Business II", "venue": "New Horizon Computer Laboratory, Stephen & Hannah Obaro Multipurpose Hall", "by": "New Horizon", "byUrl": "https://www.newhorizonsnigeria.com.ng/"},
      {"start": "11:00", "end": "13:00", "title": "Introducing the Registry Automation Solution (REGIX)", "venue": "Council/Senate Chamber", "by": "Learnflo Hi Ltd.", "byUrl": "https://www.learnflo.school"}
    ] },
    { date: "2026-11-19", sessions: [
      {"start": "10:00", "end": "13:00", "title": "2nd Annual Registry Lecture & Maiden McU Registry Social Impact Awards", "venue": "500-Seater Ultra-modern Lecture Theatre", "highlight": true}
    ] },
    { date: "2026-11-20", sessions: [
      {"start": "08:00", "end": "08:30", "title": "Gratitude Dew", "venue": "Stephen & Hannah Obaro Multipurpose Hall"},
      {"start": "09:00", "end": "10:00", "title": "Registry Week Xtra", "venue": "Council/Senate Chamber"},
      {"start": "10:00", "end": "12:00", "title": "Working with the Registry Automation Solution (REGIX)", "venue": "Council/Senate Chamber", "by": "Learnflo Hi Ltd.", "byUrl": "https://www.learnflo.school"}
    ] }
  ],

  // McU Registry Social Impact Awardees. name: null shows a "to be announced" card.
  awardees: [
    { id: "afolabi", name: "Fathia Olatoun Afolabi", photo: "assets/img/awardee-afolabi-2.jpg", linkedin: "https://www.linkedin.com/in/fathia-afolabi-a85957320/",
      bioTitle: "A heart of service, a voice for the girl-child",
      bio: "At a time when many young people are preparing for their own futures, Afolabi Fathia, a 400-level Public Health student at McPherson University, is already investing in the futures of others. Through the Afolabi Fathia Foundation, she has sponsored WAEC examination fees for indigent students and reached over 200 schoolgirls at Ajebo High School through her “Pad a Girl” initiative, providing sanitary products and essential health education.\n\nBeyond material support, Fathia is breaking the silence around menstrual health, addressing period poverty and health misinformation, and creating safe spaces for girls to understand their bodies, make informed health decisions and protect their future. Her initiatives demonstrate a practical understanding of public health: that education, access to essential health products and informed choices can transform lives and expand opportunities for girls.\n\nFathia is the first female President of the Public Health Students’ Association (PHSA), McPherson University. A passionate humanitarian whose compassion finds expression in action, Fathia exemplifies the power of student leadership, social responsibility, and community-centred service.\n\nFathia Afolabi is an McU Registry Social Impact Awardee because she is a young changemaker turning compassion into action, one girl, one opportunity, and one community at a time." },
    { id: "obajobi", name: "Elder Julius Adebowale Obajobi", photo: "assets/img/awardee-obajobi-2.jpg", linkedin: null,
      bioTitle: "A symbol of resilience, excellence and environmental stewardship",
      bio: "A beautiful, green and well-maintained campus does not happen by chance; it is the product of consistent care, hard work and dedicated hands. Since joining McPherson University in March 2024, Mr. Julius Adebowale Obajobi has distinguished himself through exceptional punctuality, consistency, and an unwavering commitment to duty. His daily efforts have helped maintain lush lawns, healthy vegetation, and beautifully landscaped surroundings, enhancing the University’s aesthetic appeal and creating a serene, welcoming environment for learning.\n\nBeyond beautification, his work contributes meaningfully to environmental sustainability and climate change mitigation. Through the cultivation of vegetation and the preservation of green spaces, he supports carbon absorption, improved air quality, and natural temperature regulation, reinforcing the University’s commitment to a greener, more climate-conscious environment.\n\nWhat sets Mr. Obajobi apart is his remarkable work ethic. Regardless of the weather or the routine nature of his assignment, he remains dependable, diligent, and consistently present at his duty post. His example is a compelling reminder that one’s position does not determine excellence, but rather the dedication, integrity and value one brings to the job.\n\nBorn on 1 October 1960, Nigeria’s Independence Day, Mr. Obajobi’s life reflects the resilience and perseverance that have characterised his professional journey. After completing his secondary education at Olurogbo High School, Ile-Ife, in 1975, he acquired printing skills under his uncle between 1980 and 1984. He subsequently joined Onward Paper Mill in Lagos in 1988, where he served as a Machine Operator for 17 years, until 2005.\n\nFrom his early technical apprenticeship to decades of industrial service and his present contribution to the University’s environment, Mr. Obajobi has demonstrated that dedication, resilience and excellence are enduring virtues.\n\nIn recognition of his exemplary work ethic, remarkable resilience, steadfast commitment to duty, and invaluable contributions to environmental sustainability and the University’s physical development, Mr. Obajobi is a proud recipient of the McU Registry Maiden Social Impact Award." },
    { id: "joshua", name: "Gift Joshua", photo: "assets/img/awardee-joshua.jpg", linkedin: "https://www.linkedin.com/in/gift-joshua/",
      bioTitle: "Living McU’s core values: excellence, integrity and service",
      bio: "During her National Youth Service Corps (NYSC) year at McPherson University, Gift Joshua served as the Outreach Chairperson of her Community Development Scheme (CDS) group, leading several community development initiatives, including a nutrition awareness campaign that reached over 100 people at the Ajebo Market and career counselling programmes for secondary school students. She also implemented a grant-funded school renovation project at Anglican Primary School, Seriki-Sotayo, Ogun State, improving the learning environment for over 130 pupils. In addition, she distributed free copies of her book to students of Ajebo Community High School and spoke to them about purpose and identity discovery.\n\nA Social Impact Professional, Author, Speaker, and Education and Healthcare Advocate, Gift Joshua is passionate about community development and youth empowerment. She believes that education is a powerful tool for nation-building and societal transformation. Having lost her parents at an early age, her personal experiences have shaped her commitment to creating opportunities for young people, particularly those growing up in challenging circumstances.\n\nShe is the author of The Girl Who Almost Gave Up, a faith-inspired short storybook that encourages hope, resilience and self-discovery among young people. She holds a Bachelor's degree in Biochemistry from the University of Ilorin. She hopes to further her academic journey in Nutrition and Dietetics, driven by her interest in disease prevention, nutrition, and healthier living.\n\nGift is a Christian passionate about faith, purpose, and using her gifts to make a positive difference in others' lives. Beyond her work in social impact, she is also a singer who enjoys expressing her faith and convictions through music, writing, and speaking. For her resilience, tenacity, and passion for putting smiles on others' faces, Gift Joshua has proudly earned an McU Registry Social Impact Award." }
  ],

  // Same order as the flier
  speakers: [
    {
      id: "igbasan",
      role: "Chief Host & Chairman",
      name: "Prof. Francis Igbasan",
      postnominals: "RAS, FAvH, MNIAS, MWARIMA",
      title: "Vice-Chancellor, McPherson University",
      photo: "assets/img/igbasan-2.jpg",
      link: {"label": "mcu.edu.ng", "url": "https://mcu.edu.ng/main/faculty-members/francis-adegbaye-igbasan/"},
      links: [{"label": "Profile on mcu.edu.ng", "url": "https://mcu.edu.ng/main/faculty-members/francis-adegbaye-igbasan/"}],
      bio: "Some scholars distinguish themselves through the knowledge they create; others through the institutions they build. Professor Francis Adegbaye Igbasan belongs to the distinguished company of those who do both.\n\nAn accomplished scholar of international repute, registered Animal Scientist, prolific researcher, and seasoned university administrator, Professor Igbasan brings over three decades of experience in teaching, research, academic development, and university administration. He is the second substantive Vice-Chancellor of McPherson University, Seriki Sotayo, Ogun State, where his tenure has been marked by remarkable institutional growth and purposeful transformation.\n\nUnder his watch, McPherson University has moved from an enrolment of 435 students to over 3,500 – a remarkable expansion of more than eightfold. Beyond the numbers, his administration has enriched the academic curriculum, introduced modern infrastructure, and commissioned over 14 strategic development projects. These are not merely statistics; they represent expanded opportunities for young people, improved facilities for teaching and learning, and a stronger institutional foundation for the generations to come. His vision is reflected not only in what has been built, but also in the growing number of lives the University is positioned to transform.\n\nHis credentials are as impressive as his accomplishments. Professor Igbasan holds a Ph.D. in Animal Science from the University of Manitoba, Winnipeg, Canada; an M.Sc. in Animal Science from the University of Ibadan; and a B.Tech. in Animal Production and Health from the Federal University of Technology, Akure. He attained the rank of Professor at FUTA in 2013 and subsequently served as Deputy Vice-Chancellor of Olusegun Agagu University of Science and Technology.\n\nA researcher whose work has crossed academic and international boundaries, he has published over 60 scientific articles, supervised numerous postgraduate scholars, and attracted prestigious international research opportunities, including the highly competitive Alexander von Humboldt Research Fellowship in Germany. His contributions extend beyond publications to mentoring the next generation of researchers and advancing scientific knowledge.\n\nHis passion for quality and excellence is also reflected in his professional training as an academic program and institutional accreditor through the National Universities Commission, the National Open University of Nigeria, and the African Quality Assurance Network. This grounding reinforces his commitment to academic standards, institutional accountability, and continuous improvement.\n\nYet, beyond the titles, publications, projects, and professional distinctions lies a man whose character has earned recognition in its own right. The Guardian Newspaper named him among its 50 Nigerians with Integrity in Leadership. He is also a recipient of the All-African Students Union African Leadership Award and productivity honours from his alma mater, FUTA.\n\nAdditionally, Professor Igbasan has held several high-level public service positions, including Chairman of the Ondo State Scholarship Board, Chairman of the Ondo State Teaching Service Commission (OSTSC), Board Member of the Ondo State Oil Producing Areas Development Commission (OSOPADEC), and member of the Ondo State Policy, Planning and Implementation Committee. He has also served on the Governing Council of Harvest Time Bible College, Akure.\n\nFrom the laboratories of scientific research to the corridors of university administration, from mentoring postgraduate scholars to expanding the frontiers of institutional development, Professor Francis Adegbaye Igbasan has demonstrated that true distinction is measured not simply by positions attained, but by the positive difference made.\n\nHe is a scholar whose knowledge informs progress, an administrator whose vision produces measurable results, and a man whose integrity gives meaning to achievement. His enduring contribution lies not merely in the institutions he has served, but in the opportunities he has created, the lives he has influenced, and the future he continues to help shape.\n\nMcU celebrates Professor Francis Adegbaye Igbasan – an accomplished academic, a distinguished university administrator, and a worthy ambassador of excellence and integrity."
    },
    {
      id: "adekola",
      role: "Keynote Speaker",
      name: "Dr. Bola Adekola",
      postnominals: "FCIA, FCIDA, FSM",
      title: "Pioneer Registrar, Fountain University; former Registrar, FUNAAB; former Secretary-General, ARNU",
      photo: "assets/img/adekola-2.jpg",
      link: {"label": "LinkedIn", "url": "https://www.linkedin.com/in/bola-adekola-ph-d-fcia-fcida-fsm-b97a7773/"},
      links: [{"label": "LinkedIn", "url": "https://www.linkedin.com/in/bola-adekola-ph-d-fcia-fcida-fsm-b97a7773/"}],
      bio: "Dr. ‘Bola Adekola is a seasoned university administrator, researcher and institutional leader with over three decades of experience in university administration, spanning Nigeria’s public, private and federal university systems. His distinguished career includes rising through the ranks at Olabisi Onabanjo University, serving as Pioneer Registrar of Fountain University between 2007 and 2012, and as the 4th substantive Registrar of the Federal University of Agriculture, Abeokuta (FUNAAB), where he served from 2017 to 2023. He also served as Secretary-General of the Association of Registrars of Nigerian Universities, contributing to professional leadership beyond his institution.\n\nA Researcher in Personnel Management and Psychology and holder of a PhD in Personnel Psychology, Dr. Adekola has worked across several critical areas of university administration, including Faculty administration, Postgraduate School, Academic Planning, Senate Affairs and Council Affairs, amongst others. This breadth of exposure across different institutional settings has given him a practical understanding of the people, policies, processes, and resources that drive university administration.\n\nAn astute manager of men, materials and money and an award-winning professional, he is particularly recognised for combining administrative experience with people-centred leadership, professional discipline and institutional responsibility.\n\nHis professional journey began in 1990 as a Social Mobilisation Officer with MAMSER before he moved into university administration. From Administrative Officer to Pioneer Registrar and yet another Registrarship position, his progression reflects experience earned across the full spectrum of university administration.\n\nYet, perhaps the most compelling part of his story is where it began. Having lost both parents at an early age, he worked menial jobs, including farm work and teaching, to support his education. From Lukogbe in Ogun Waterside to the highest levels of university administration, his journey is a powerful testament to the transformative potential of education, resilience, and purposeful service.\n\nWith experience across three university ownership structures (private, state and federal), national professional leadership and multiple areas of university administration, Dr. Adekola brings to the Registry Lecture not merely theory, but practical experiences and lessons drawn from more than three decades in the field.\n\nHis enduring philosophy is simple: tough times do not last; with education, hard work, integrity, discipline and the right attitude, people can rise beyond their circumstances and institutions can rise to meet their purpose.\n\nBeyond these, Dr. Adekola enjoys being the husband of Oluwakemi Adekola, a Professor of Language Education at Fountain University, Osogbo, and they are blessed with lovely children and grandchildren."
    },
    {
      id: "babalola",
      role: "Guest Lecturer",
      name: "Dr. Grace Olubunmi Babalola Esq.",
      postnominals: "FCIA, FCIPM, FIPMLD",
      title: "Registrar, Adekunle Ajasin University",
      photo: "assets/img/babalola-3.jpg",
      link: {"label": "LinkedIn", "url": "https://www.linkedin.com/in/grace-babalola-59586a343/"},
      links: [{"label": "LinkedIn", "url": "https://www.linkedin.com/in/grace-babalola-59586a343/"}],
      bio: "Dr. Grace Olubunmi Babalola is an eminent university administrator, a distinguished legal scholar, and a leader in higher education governance who currently serves as the sixth substantive and second female Registrar of Adekunle Ajasin University, Akungba-Akoko (AAUA), Ondo State, Nigeria. Her career stands as a testament to systemic excellence, bridging higher education management, legal jurisprudence, and ethical public leadership.\n\nDr. Babalola's academic foundation began at Olabisi Onabanjo University, where she graduated as Overall Best Student in the Faculty of Law before her call to the Nigerian Bar at the Nigerian Law School, Abuja. She holds a Master of Business Administration (MBA), a Master of Laws (LL.M.), and a Doctor of Philosophy (Ph.D.) in Law, with specialised expertise in security studies, international humanitarian law, and the law of armed conflict. She also earned a Postgraduate Diploma from the International Institute of Pastoral Education and Chaplaincy (IIPEC).\n\nHer institutional trajectory at Adekunle Ajasin University reflects an exceptional record of service, having served successively as University Legal Officer, Endowment Officer within the Advancement Office, Head of Academic Staff Establishment in the Personnel Division, Head of the Council Affairs Division, and Head of the Academic Affairs Division. An accomplished contributor to global academic discourse, Dr Babalola has presented research at world-renowned institutions, including the Universities of Oxford, Cambridge, Manchester, Durham, Stratford, and Nottingham Trent in the United Kingdom, as well as the Durban University of Technology in South Africa.\n\nShe is the author of “The E-Administrator: Humanizing Reforms, Global Standards, and the New Face of University Administration in Nigeria”, and three other forthcoming books on 21st-century registry practices, educational law, ethical university governance, and students' advocacy.\n\nHer high professional standing is reflected in her Fellowship of the Chartered Institute of Corporate Administrators (FCIA), the Chartered Institute of Public Management of Nigeria (FCIPM), and the Institute of Public Management and Leadership Development (FIPMLD). She holds active professional memberships in the Association of Higher Educational Professionals (AHEP, UK), the Association of Nigerian Professional Administrators (ANUPA), the Chartered Institute of Personnel Management (CIPM), the International Federation of Women Lawyers (FIDA), and the Society for Peace Studies and Practice (SPSP).\n\nFurthermore, she holds notable honorary distinctions as a four-Star General of Chaplains with the International Institute of Chaplaincy, an Alumna of the Nigerian Institute of Advanced Legal Studies (NIALS), a life Member of Legal Temple Nigeria, and a life Member of the Bible Society of Nigeria.\n\nBeyond her administrative and scholarly commitments, Dr. Babalola serves as Legal Adviser to regional bodies including the Pentecostal Fellowship of Nigeria (Ondo North Senatorial District) and the Christian Association of Nigeria (Akoko North West Local Government Area); she is the Resident Pastor of King's Renaissance Embassy Worldwide (Havillah Parish), Convener of the monthly \"Let's Talk Relationship\" forum, and Patron of the Joint Christian Campus Fellowship, AAUA Chapter.\n\nDr. Grace Olubunmi Babalola, Esq. is married to Bishop Felix Ayo Babalola, and they are blessed with two sons."
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
      bioTitle: "Distinguished university administrator, communication expert, mentor and social impact leader",
      // [text](url) inside a bio becomes a link
      bio: "With a wealth of professional experience and a career spanning university administration, human resources, public relations, communication and social impact, Mrs. Emi’ Alawode has distinguished herself as an accomplished higher education administrator, a resourceful institutional builder and a passionate champion of human development. As the current Registrar of McPherson University, she brings together administrative excellence, innovation and people-centred leadership, with a remarkable record of turning challenges into measurable results and opportunities into lasting impact.\n\nAt the Federal University of Agriculture, Abeokuta (FUNAAB), Nigeria, she pioneered electronic meeting folders for the Appointments and Promotions Committee, reducing paper use and improving access to committee documents. As Head of Examinations and Records Unit, she initiated a database management system that reduced student records retrieval time by 40%, supervised registration for over 12,500 students, and cut transcript processing time from 3 months to 3 weeks through workflow redesign. She also supervised graduation lists with 100% compliance with Senate standards. As Head of the Establishment Matters Division, she oversaw appointments, confirmations, promotions, and retirements for over 3,000 senior academic and administrative staff, while as Secretary to the Postgraduate School, she processed over 2,000 admissions in three months. At FUNAAB, she supported two substantive Vice-Chancellors and two other Acting Vice-Chancellors as Head of the Public Relations and Protocol Unit, where she redesigned the university-wide bulletin and, as the College Officer for different Colleges over the years, introduced College Bulletins.\n\nA pioneer in institution-building, Mrs. Alawode served as Pioneer Deputy Registrar at McPherson University in 2012, supporting its foundational operations, including student admissions, registration, and onboarding. She led public relations and protocol functions, strengthened institutional communication, coordinated major university events, and contributed to policies through Council, Appointments, and other university committees. She also launched its first news bulletin, McU Echo, establishing a stronger culture of campus information sharing.\n\nBeyond the university environment, Mrs. Alawode has made a significant contribution to women’s empowerment and digital inclusion. As a mentor and coach, she has directly and indirectly trained and guided over 7,500 women and girls in leadership, communication, and digital skills. She co-convenes EmpowerHer, a mentorship initiative that has supported over 1,000 female undergraduates in Nigeria and South Africa, helping them navigate career barriers and prepare for leadership. As a World Pulse Digital Changemaker and member of its [Power Inclusive Excellence (PIE) Committee](https://impact.worldpulse.org/staff), one of the organisation’s two governance groups, she contributes to a global community of over 80,000 women and changemakers. Her service as a volunteer Director of Women Who Code, Barcelona, further reflects her commitment to opening doors for women in technology.\n\nHer passion for making technology accessible extends to her work as a [SheAI](https://www.sheai.co/educators) Educator and workshop facilitator, where she simplifies artificial intelligence for women without coding backgrounds, helping them explore its practical use in careers, business, and leadership. As a Business English Instructor at the [Swiss School of Management in Barcelona](https://isass.eu/academic-support/emilomo-joy-alawode-2/), she has also strengthened students’ communication, presentation, and critical-thinking skills for professional success. Her [doctoral research](https://tu-dresden.de/ga/qualifizierung/eutopia/eutopia-impact-school-2023-bericht?set_language=en#section-1) examines how women in Southwestern Nigeria use WhatsApp for business, exploring the role of digital tools in women’s entrepreneurship and economic opportunity.\n\nAn international speaker, Mrs. Alawode has addressed audiences at [Women in Tech](https://www.womentech.net/speaker/all/all/101522), Aspire Global Unity Conferences and the [Women Leaders in Higher Education (WLHE) Summit](https://wlhe-summit.co.za/speaker-bios/panelist/e-j-alawode.html), sharing practical insights on communication, technology, women’s empowerment and cross-cultural understanding. She is a multi-fellow awardee of organisations including the Netherlands Universities Foundation for International Cooperation, the [Internet Society](https://www.internetsociety.org/fellowships/mid-career/2023-fellows/) and Every Woman Treaty. She holds double Master’s degrees in International Communication from Leeds Beckett University, United Kingdom, and Vilnius University, Lithuania, where she co-created Dash, Don’t Trash, a social-impact communication project that promotes recycling and supports people in need through crowdfunding. Having travelled to nearly every continent, she brings a rich global perspective to her work and relationships.\n\nHer commitment to service also extends to faith and community. As President of the Abeokuta District Pastors’ Wives and Lady Ministers Fellowship of the Foursquare Gospel Church in Nigeria, she convenes the Zarephath Ladies League, a special hang-out that offers widows friendship, companionship and a safe space to find renewed strength amid grief and isolation. A member of global communities including Lean In, Toastmasters, Bloom, Women Techmakers and the Internet Society, she continues to champion learning, inclusion and the growth of others.\n\nMrs. Emi’ Alawode is more than an accomplished administrator; she is a builder of systems, a discoverer of potential and a champion of people. Through her work, she demonstrates that excellence in administration is measured not only by records processed and systems improved, but also by lives strengthened, opportunities opened, and communities empowered."
    }
  ],

  /* 2025 & 2026 Registry Lecture Local Organising Committee.
     Add one entry per member. `linkedin` is optional; with it, the name becomes a link.
     e.g. { name: "Mr. John Doe", role: "Chairman", linkedin: "https://www.linkedin.com/in/..." } */
  committee: [
    { name: "Mr. Tokunbo Olakunle", role: "Chairman", linkedin: "https://www.linkedin.com/in/tokunbo-olakunle-342500306/" },
    { name: "Mr. Ayodeji Adesina", role: "Member", linkedin: "https://www.linkedin.com/in/adesina-ayodeji-44a81b28/" },
    { name: "Mrs. Omowunmi Fagbohun", role: "Member", linkedin: "https://www.linkedin.com/in/omowunmi-famose-fagbohun-b444aa13a/" },
    { name: "Mr. Benjamin Edison", role: "Member", linkedin: "https://www.linkedin.com/in/edison-benjamin-387423359/" },
    { name: "Mr. Isaac Merayebu", role: "Member", linkedin: "https://www.linkedin.com/in/isaac-merayebu-841a38b6/" },
    { name: "Mrs. Nike Adesida", role: "Member", linkedin: "https://www.linkedin.com/in/nike-adesida-b579121b5/" },
    { name: "Mrs. Funmilayo Adesina", role: "Co-opted Member", linkedin: "https://www.linkedin.com/in/adesina-funmi-52b53b182/" },
    { name: "Dr. Mrs. Oluwatoni Yalumo", role: "Co-opted Member", linkedin: "https://www.linkedin.com/in/oluwatoni-yalumo-0927b8448/" },
    { name: "Ms. Oluwaseun Akindele", role: "Co-opted Member", linkedin: null },
    { name: "Mr. Abiola Oduyemi", role: "Co-opted Member", linkedin: "https://www.linkedin.com/in/ab%C3%AD%C3%B3l%C3%A1od%C3%B9yem%C3%AD/" },
    { name: "Mr. Oluwaseyi Ojo", role: "Secretary", linkedin: "https://www.linkedin.com/in/oluwaseyi-ojo-74995271/" }
  ],
  // Former Registrars of McPherson University (Registry dropdown), oldest first
  formerRegistrars: [
    { name: "Mrs. Adebola Abegunde JP", role: "Pioneer Registrar", years: "2012 – 2017", linkedin: null },
    { name: "Mrs. Tokunbo Alaba Kehinde", role: "Registrar", years: "2017 – 2022", linkedin: "https://www.linkedin.com/in/tokunbo-kehinde-b9044b28/" },
    { name: "Mr. Olufemi Adebowale", role: "Acting Registrar", years: "2022 – 2025", linkedin: "https://www.linkedin.com/in/olufemi-ade-adebowale/" }
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
