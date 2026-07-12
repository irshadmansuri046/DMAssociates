-- Fill Gujarati names for talukas, places, and SRO offices
update public.gu_talukas t set name_gu = v.name_gu from (values
  ('Abdasa', 'અબડાસા'),
  ('Ahmedabad', 'અમદાવાદ'),
  ('Ahwa', 'આહવા'),
  ('Ambika', 'અંબિકા'),
  ('Amirgadh', 'અમીરગઢ'),
  ('Amod', 'આમોદ'),
  ('Amreli', 'અમરેલી'),
  ('Anand', 'આણંદ'),
  ('Anjar', 'અંજાર'),
  ('Anklav', 'અંકલાવ'),
  ('Ankleshwar', 'અંકલેશ્વર'),
  ('Areth', 'અરેઠ'),
  ('Babra', 'બાબરા'),
  ('Bagasara', 'બગસરા'),
  ('Balasinor', 'બાલાસિનોર'),
  ('Bardoli', 'બારડોલી'),
  ('Barwala', 'બરવાળા'),
  ('Bavla', 'બાવળા'),
  ('Bayad', 'બાયડ'),
  ('Becharaji', 'બેચરાજી'),
  ('Bhabhar', 'ભાભર'),
  ('Bhachau', 'ભચાઉ'),
  ('Bhanvad', 'ભાણવડ'),
  ('Bharuch', 'ભરૂચ'),
  ('Bhavnagar', 'ભાવનગર'),
  ('Bhesana', 'ભેસાણા'),
  ('Bhiloda', 'ભિલોડા'),
  ('Bhuj', 'ભુજ'),
  ('Bodeli', 'બોડેલી'),
  ('Borsad', 'બોરસદ'),
  ('Botad', 'બોટાદ'),
  ('Chanasma', 'ચાણસ્મા'),
  ('Chhota Udaipur', 'છોટાઉદેપુર'),
  ('Chikda', 'ચીકડા'),
  ('Chikhli', 'ચીખલી'),
  ('Choryasi', 'ચોર્યાસી'),
  ('Chotila', 'ચોટીલા'),
  ('Chuda', 'ચુડા'),
  ('Dabhoi', 'ડભોઈ'),
  ('Dahod', 'દાહોદ'),
  ('Danta', 'દાંતા'),
  ('Dantiwada', 'દાંતીવાડા'),
  ('Dasada', 'દસાડા'),
  ('Daskroi', 'દસક્રોઈ'),
  ('Dediapada', 'ડેડિયાપાડા'),
  ('Deesa', 'ડીસા'),
  ('Dehgam', 'દેહગામ'),
  ('Deodar', 'દેવદર'),
  ('Desar', 'દેસર'),
  ('Detroj-Rampura', 'દેત્રોજ-રામપુરા'),
  ('Devgadh baria', 'દેવગઢ બારિયા'),
  ('Dhandhuka', 'ધંધુકા'),
  ('Dhanera', 'ધાનેરા'),
  ('Dhanpur', 'ધાનપુર'),
  ('Dhansura', 'ધાનસુરા'),
  ('Dharampur', 'ધરમપુર'),
  ('Dhari', 'ધારી'),
  ('Dharnidhar', 'ધરણીધર'),
  ('Dholera', 'ધોલેરા'),
  ('Dholka', 'ધોલકા'),
  ('Dhoraji', 'ધોરાજી'),
  ('Dhrangadhra', 'ધ્રાંગધ્રા'),
  ('Dhrol', 'ધ્રોલ'),
  ('Dolvan', 'ડોલવણ'),
  ('Fagvel', 'ફાગવેલ'),
  ('Fatepura', 'ફતેપુરા'),
  ('Gadhada', 'ગઢડા'),
  ('Galteshwar', 'ગલ્તેશ્વર'),
  ('Gandevi', 'ગણદેવી'),
  ('Gandhidham', 'ગાંધીધામ'),
  ('Gandhinagar', 'ગાંધીનગર'),
  ('Garbada', 'ગરબાડા'),
  ('Gariadhar', 'ગારિયાધાર'),
  ('Garudeshwar', 'ગરુડેશ્વર'),
  ('Ghogha', 'ઘોઘા'),
  ('Ghoghamba', 'ઘોઘંબા'),
  ('Gir-Gadhada', 'ગીર-ગઢડા'),
  ('Godhar(Gujarat)', 'ગોધર'),
  ('Godhra', 'ગોધરા'),
  ('Gondal', 'ગોંડલ'),
  ('Guru Govind Limdi', 'ગુરુ ગોવિંદ લીમડી'),
  ('Hadad', 'હડદ'),
  ('Halol', 'હાલોલ'),
  ('Halvad', 'હળવદ'),
  ('Hansot', 'હાંસોટ'),
  ('Harij', 'હરીજ'),
  ('Himatnagar', 'હિંમતનગર'),
  ('Idar', 'ઈડર'),
  ('Jafrabad', 'જાફરાબાદ'),
  ('Jalalpore', 'જલાલપોર'),
  ('Jambughoda', 'જાંબુઘોડા'),
  ('Jambusar', 'જંબુસર'),
  ('Jamjodhpur', 'જામજોધપુર'),
  ('Jamkandorna', 'જામકંડોરણા'),
  ('Jamnagar', 'જામનગર'),
  ('Jasdan', 'જસદણ'),
  ('Jesar', 'જેસર'),
  ('Jetpur', 'જેતપુર'),
  ('Jetpur pavi', 'જેતપુર પાવી'),
  ('Jhagadia', 'ઝઘડિયા'),
  ('Jhalod', 'ઝાલોદ'),
  ('Jodiya', 'જોડિયા'),
  ('Jotana', 'જોટાણા'),
  ('Junagadh', 'જૂનાગઢ'),
  ('Junagadh Rural', 'જૂનાગઢ ગ્રામ્ય'),
  ('Kadana', 'કડાણા'),
  ('Kadi', 'કડી'),
  ('Kadwal', 'કડવાલ'),
  ('Kalavad', 'કાલાવડ'),
  ('Kalol', 'કલોલ'),
  ('Kalyanpur', 'કલ્યાણપુર'),
  ('Kamrej', 'કામરેજ'),
  ('Kankrej(Shihori', 'કાંકરેજ (શિહોરી)'),
  ('Kapadvanj', 'કપડવંજ'),
  ('Kaprada', 'કપરાડા'),
  ('Karjan', 'કરજણ'),
  ('Kathlal', 'કઠલાલ'),
  ('Kavant', 'કાવંત'),
  ('Keshod', 'કેશોદ'),
  ('Khambha', 'ખાંભા'),
  ('Khambhalia', 'ખંભાળિયા'),
  ('Khambhat', 'ખંભાત'),
  ('Khanpur', 'ખાનપુર'),
  ('Kheda', 'ખેડા'),
  ('Khedbrahma', 'ખેડબ્રહ્મા'),
  ('Kheralu', 'ખેરાલુ'),
  ('Khergam', 'ખેરગામ'),
  ('Kodinar', 'કોડીનાર'),
  ('Kotada Sangani', 'કોટડા સાંગાણી'),
  ('Kothamba', 'કોઠંબા'),
  ('Kukarmunda', 'કુકરમુંડા'),
  ('Kunkavav vadia', 'કુંકાવાવ વડિયા'),
  ('Kutiyana', 'કુતિયાણા'),
  ('Lakhani', 'લાખાણી'),
  ('Lakhpat', 'લખપત'),
  ('Lakhtar', 'લખતર'),
  ('Lalpur', 'લાલપુર'),
  ('Lathi', 'લાઠી'),
  ('Lilia', 'લીલીયા'),
  ('Limbdi', 'લીમડી'),
  ('Limkheda', 'લીમખેડા'),
  ('Lodhika', 'લોધીકા'),
  ('Lunawada', 'લુણાવાડા'),
  ('Mahudha', 'મહુધા'),
  ('Mahuva', 'મહુવા'),
  ('Malia', 'માલિયા'),
  ('Maliya', 'માલિયા'),
  ('Malpur', 'માલપુર'),
  ('Manavadar', 'માણાવદર'),
  ('Mandal', 'માંડલ'),
  ('Mandvi', 'માંડવી'),
  ('Mangrol', 'માંગરોળ'),
  ('Mansa', 'માંસા'),
  ('Matar', 'માતર'),
  ('Meghraj', 'મેઘરાજ'),
  ('Mehmedabad', 'મહેમદાવાદ'),
  ('Mehsana', 'મહેસાણા'),
  ('Mendarda', 'મેન્દરડા'),
  ('Modasa', 'મોડાસા'),
  ('Morbi', 'મોરબી'),
  ('Morwa Hadaf', 'મોરવા હાડફ'),
  ('Muli', 'મૂળી'),
  ('Mundra', 'મુંદ્રા'),
  ('Nadiad', 'નડિયાદ'),
  ('Nakhatrana', 'નખત્રાણા'),
  ('Nana Pondha', 'નાના પોંઢા'),
  ('Nandod', 'નાંદોદ'),
  ('Nasvadi', 'નસવાડી'),
  ('Navsari', 'નવસારી'),
  ('Netrang', 'નેત્રંગ'),
  ('Nizar', 'નિઝર'),
  ('Ogad(Thara)', 'ઓગડ (થરા)'),
  ('Okhamandal', 'ઓખામંડળ'),
  ('Olpad', 'ઓલપાડ'),
  ('Paddhari', 'પડધરી'),
  ('Padra', 'પાદરા'),
  ('Palanpur', 'પાલનપુર'),
  ('Palitana', 'પાલીતાણા'),
  ('Palsana', 'પલસાણા'),
  ('Pardi', 'પારડી'),
  ('Patan', 'પાટણ'),
  ('Petlad', 'પેટલાદ'),
  ('Porbandar', 'પોરબંદર'),
  ('Poshina', 'પોશીના'),
  ('Prantij', 'પ્રાંતિજ'),
  ('Radhanpur', 'રાધનપુર'),
  ('Rah', 'રાહ'),
  ('Rajkot', 'રાજકોટ'),
  ('Rajula', 'રાજુલા'),
  ('Ranavav', 'રાણાવાવ'),
  ('Ranpur', 'રાણપુર'),
  ('Rapar', 'રાપર'),
  ('Sagbara', 'સાગબારા'),
  ('Sami', 'સામી'),
  ('Sanand', 'સાણંદ'),
  ('Sanjeli', 'સાંજેલી'),
  ('Sankheda', 'સંખેડા'),
  ('Sankheswar', 'સંખેશ્વર'),
  ('Santalpur', 'સંતલપુર'),
  ('Santrampur', 'સંતરામપુર'),
  ('Sarasvati', 'સરસ્વતી'),
  ('Sathamba', 'સાથંબા'),
  ('Satlasana', 'સતલાસણા'),
  ('Savarkundla', 'સાવરકુંડલા'),
  ('Savli', 'સાવલી'),
  ('Sayla', 'સાયલા'),
  ('Shamlaji', 'શામળાજી'),
  ('Shehera', 'શહેરા'),
  ('Sidhpur', 'સિદ્ધપુર'),
  ('Sihor', 'સિહોર'),
  ('Singvad', 'સિંગવડ'),
  ('Sinor', 'સિનોર'),
  ('Sojitra', 'સોજીત્રા'),
  ('Songadh', 'સોનગઢ'),
  ('Subir', 'સુબીર'),
  ('Suigam', 'સુઈગામ'),
  ('Sukhsar', 'સુખસર'),
  ('Surat', 'સુરત'),
  ('Sutrapada', 'સુત્રાપાડા'),
  ('Talaja', 'તળાજા'),
  ('Talala', 'તલાલા'),
  ('Talod', 'તલોદ'),
  ('Tankara', 'ટંકારા'),
  ('Tarapur', 'તારાપુર'),
  ('Thangadh', 'થાંગઢ'),
  ('Tharad', 'થરાદ'),
  ('Thasra', 'ઠાસરા'),
  ('Tilakwada', 'તિલકવાડા'),
  ('Uchhal', 'ઉચ્છલ'),
  ('Ukai', 'ઉકાઈ'),
  ('Umarpada', 'ઉમરપાડા'),
  ('Umbergaon', 'ઉમરગામ'),
  ('Umrala', 'ઉમરાળા'),
  ('Umreth', 'ઉમરેઠ'),
  ('Una', 'ઉના'),
  ('Unjha', 'ઉંઝા'),
  ('Upleta', 'ઉપલેટા'),
  ('Vadali', 'વડાલી'),
  ('Vadgam', 'વડગામ'),
  ('Vadnagar', 'વડનગર'),
  ('Vadodara', 'વડોદરા'),
  ('Vagra', 'વાગરા'),
  ('Valia', 'વાલિયા'),
  ('Vallabhipur', 'વલ્લભીપુર'),
  ('Valod', 'વાલોડ'),
  ('Valsad', 'વલસાડ'),
  ('Vansda', 'વાંસદા'),
  ('Vanthali', 'વંથલી'),
  ('Vapi', 'વાપી'),
  ('Vaso', 'વાસો'),
  ('Vav', 'વાવ'),
  ('Veraval', 'વેરાવળ'),
  ('Vijapur', 'વિજાપુર'),
  ('Vijaynagar', 'વિજયનગર'),
  ('Vinchchiya', 'વિંછિયા'),
  ('Viramgam', 'વિરમગામ'),
  ('Virpur', 'વીરપુર'),
  ('Visavadar', 'વીસાવદર'),
  ('Visnagar', 'વિસનગર'),
  ('Vyara', 'વ્યારા'),
  ('Wadhwan', 'વઢવાણ'),
  ('Waghai', 'વાઘઈ'),
  ('Waghodia', 'વાઘોડિયા'),
  ('Wankaner', 'વાંકાનેર')
) as v(name_en, name_gu) where t.name_en = v.name_en;

update public.gu_places p set name_gu = v.name_gu from (values
  ('Abdasa', 'અબડાસા'),
  ('Ahmedabad', 'અમદાવાદ'),
  ('Ahmedabad City', 'અમદાવાદ શહેર'),
  ('Ahwa', 'આહવા'),
  ('Amarnagar', 'અમરનગર'),
  ('Ambika', 'અંબિકા'),
  ('Amirgadh', 'અમીરગઢ'),
  ('Amod', 'આમોદ'),
  ('Amreli', 'અમરેલી'),
  ('Anand', 'આણંદ'),
  ('Anjar', 'અંજાર'),
  ('Anklav', 'અંકલાવ'),
  ('Ankleshwar', 'અંકલેશ્વર'),
  ('Areth', 'અરેઠ'),
  ('Babra', 'બાબરા'),
  ('Bagasara', 'બગસરા'),
  ('Balasinor', 'બાલાસિનોર'),
  ('Bardoli', 'બારડોલી'),
  ('Barwala', 'બરવાળા'),
  ('Bavla', 'બાવળા'),
  ('Bayad', 'બાયડ'),
  ('Becharaji', 'બેચરાજી'),
  ('Bhabhar', 'ભાભર'),
  ('Bhachau', 'ભચાઉ'),
  ('Bhanvad', 'ભાણવડ'),
  ('Bharuch', 'ભરૂચ'),
  ('Bhavnagar', 'ભાવનગર'),
  ('Bhesana', 'ભેસાણા'),
  ('Bhiloda', 'ભિલોડા'),
  ('Bhuj', 'ભુજ'),
  ('Bodeli', 'બોડેલી'),
  ('Borsad', 'બોરસદ'),
  ('Botad', 'બોટાદ'),
  ('Champrajpur', 'ચંપરાજપુર'),
  ('Chanasma', 'ચાણસ્મા'),
  ('Chhota Udaipur', 'છોટાઉદેપુર'),
  ('Chikda', 'ચીકડા'),
  ('Chikhli', 'ચીખલી'),
  ('Choryasi', 'ચોર્યાસી'),
  ('Chotila', 'ચોટીલા'),
  ('Chuda', 'ચુડા'),
  ('Dabhoi', 'ડભોઈ'),
  ('Dahod', 'દાહોદ'),
  ('Danta', 'દાંતા'),
  ('Dantiwada', 'દાંતીવાડા'),
  ('Dasada', 'દસાડા'),
  ('Daskroi', 'દસક્રોઈ'),
  ('Dediapada', 'ડેડિયાપાડા'),
  ('Deesa', 'ડીસા'),
  ('Dehgam', 'દેહગામ'),
  ('Deodar', 'દેવદર'),
  ('Desar', 'દેસર'),
  ('Detroj-Rampura', 'દેત્રોજ-રામપુરા'),
  ('Devgadh baria', 'દેવગઢ બારિયા'),
  ('Dhandhuka', 'ધંધુકા'),
  ('Dhanera', 'ધાનેરા'),
  ('Dhanpur', 'ધાનપુર'),
  ('Dhansura', 'ધાનસુરા'),
  ('Dharampur', 'ધરમપુર'),
  ('Dhari', 'ધારી'),
  ('Dharnidhar', 'ધરણીધર'),
  ('Dholera', 'ધોલેરા'),
  ('Dholka', 'ધોલકા'),
  ('Dhoraji', 'ધોરાજી'),
  ('Dhrangadhra', 'ધ્રાંગધ્રા'),
  ('Dhrol', 'ધ્રોલ'),
  ('Dolvan', 'ડોલવણ'),
  ('Fagvel', 'ફાગવેલ'),
  ('Fatepura', 'ફતેપુરા'),
  ('Gadhada', 'ગઢડા'),
  ('Galteshwar', 'ગલ્તેશ્વર'),
  ('Gandevi', 'ગણદેવી'),
  ('Gandhidham', 'ગાંધીધામ'),
  ('Gandhinagar', 'ગાંધીનગર'),
  ('Garbada', 'ગરબાડા'),
  ('Gariadhar', 'ગારિયાધાર'),
  ('Garudeshwar', 'ગરુડેશ્વર'),
  ('Ghogha', 'ઘોઘા'),
  ('Ghoghamba', 'ઘોઘંબા'),
  ('Gir-Gadhada', 'ગીર-ગઢડા'),
  ('Godhar(Gujarat)', 'ગોધર'),
  ('Godhra', 'ગોધરા'),
  ('Gondal', 'ગોંડલ'),
  ('Guru Govind Limdi', 'ગુરુ ગોવિંદ લીમડી'),
  ('Hadad', 'હડદ'),
  ('Halol', 'હાલોલ'),
  ('Halvad', 'હળવદ'),
  ('Hansot', 'હાંસોટ'),
  ('Harij', 'હરીજ'),
  ('Himatnagar', 'હિંમતનગર'),
  ('Idar', 'ઈડર'),
  ('Jafrabad', 'જાફરાબાદ'),
  ('Jalalpore', 'જલાલપોર'),
  ('Jambughoda', 'જાંબુઘોડા'),
  ('Jambusar', 'જંબુસર'),
  ('Jamjodhpur', 'જામજોધપુર'),
  ('Jamkandorna', 'જામકંડોરણા'),
  ('Jamnagar', 'જામનગર'),
  ('Jasdan', 'જસદણ'),
  ('Jesar', 'જેસર'),
  ('Jetpur', 'જેતપુર'),
  ('Jetpur Navagadh', 'જેતપુર નવાગઢ'),
  ('Jetpur pavi', 'જેતપુર પાવી'),
  ('Jhagadia', 'ઝઘડિયા'),
  ('Jhalod', 'ઝાલોદ'),
  ('Jodiya', 'જોડિયા'),
  ('Jotana', 'જોટાણા'),
  ('Junagadh', 'જૂનાગઢ'),
  ('Junagadh Rural', 'જૂનાગઢ ગ્રામ્ય'),
  ('Kadana', 'કડાણા'),
  ('Kadi', 'કડી'),
  ('Kadwal', 'કડવાલ'),
  ('Kalavad', 'કાલાવડ'),
  ('Kalol', 'કલોલ'),
  ('Kalyanpur', 'કલ્યાણપુર'),
  ('Kamrej', 'કામરેજ'),
  ('Kankrej(Shihori', 'કાંકરેજ (શિહોરી)'),
  ('Kapadvanj', 'કપડવંજ'),
  ('Kaprada', 'કપરાડા'),
  ('Karjan', 'કરજણ'),
  ('Kathlal', 'કઠલાલ'),
  ('Kavant', 'કાવંત'),
  ('Keshod', 'કેશોદ'),
  ('Khambha', 'ખાંભા'),
  ('Khambhalia', 'ખંભાળિયા'),
  ('Khambhat', 'ખંભાત'),
  ('Khanpur', 'ખાનપુર'),
  ('Kheda', 'ખેડા'),
  ('Khedbrahma', 'ખેડબ્રહ્મા'),
  ('Kheralu', 'ખેરાલુ'),
  ('Khergam', 'ખેરગામ'),
  ('Kodinar', 'કોડીનાર'),
  ('Kotada Sangani', 'કોટડા સાંગાણી'),
  ('Kothamba', 'કોઠંબા'),
  ('Kukarmunda', 'કુકરમુંડા'),
  ('Kunkavav vadia', 'કુંકાવાવ વડિયા'),
  ('Kutiyana', 'કુતિયાણા'),
  ('Lakhani', 'લાખાણી'),
  ('Lakhpat', 'લખપત'),
  ('Lakhtar', 'લખતર'),
  ('Lalpur', 'લાલપુર'),
  ('Lathi', 'લાઠી'),
  ('Lilia', 'લીલીયા'),
  ('Limbdi', 'લીમડી'),
  ('Limkheda', 'લીમખેડા'),
  ('Lodhika', 'લોધીકા'),
  ('Lunawada', 'લુણાવાડા'),
  ('Mahudha', 'મહુધા'),
  ('Mahuva', 'મહુવા'),
  ('Malia', 'માલિયા'),
  ('Maliya', 'માલિયા'),
  ('Malpur', 'માલપુર'),
  ('Manavadar', 'માણાવદર'),
  ('Mandal', 'માંડલ'),
  ('Mandvi', 'માંડવી'),
  ('Mangrol', 'માંગરોળ'),
  ('Mansa', 'માંસા'),
  ('Matar', 'માતર'),
  ('Meghraj', 'મેઘરાજ'),
  ('Mehmedabad', 'મહેમદાવાદ'),
  ('Mehsana', 'મહેસાણા'),
  ('Mendarda', 'મેન્દરડા'),
  ('Modasa', 'મોડાસા'),
  ('Morbi', 'મોરબી'),
  ('Morwa Hadaf', 'મોરવા હાડફ'),
  ('Muli', 'મૂળી'),
  ('Mundra', 'મુંદ્રા'),
  ('Nadiad', 'નડિયાદ'),
  ('Nakhatrana', 'નખત્રાણા'),
  ('Nana Pondha', 'નાના પોંઢા'),
  ('Nandod', 'નાંદોદ'),
  ('Nasvadi', 'નસવાડી'),
  ('Navsari', 'નવસારી'),
  ('Netrang', 'નેત્રંગ'),
  ('Nizar', 'નિઝર'),
  ('Ogad(Thara)', 'ઓગડ (થરા)'),
  ('Okhamandal', 'ઓખામંડળ'),
  ('Olpad', 'ઓલપાડ'),
  ('Paddhari', 'પડધરી'),
  ('Padra', 'પાદરા'),
  ('Palanpur', 'પાલનપુર'),
  ('Palitana', 'પાલીતાણા'),
  ('Palsana', 'પલસાણા'),
  ('Pardi', 'પારડી'),
  ('Patan', 'પાટણ'),
  ('Petlad', 'પેટલાદ'),
  ('Porbandar', 'પોરબંદર'),
  ('Poshina', 'પોશીના'),
  ('Prantij', 'પ્રાંતિજ'),
  ('Radhanpur', 'રાધનપુર'),
  ('Rah', 'રાહ'),
  ('Rajkot', 'રાજકોટ'),
  ('Rajkot City', 'રાજકોટ શહેર'),
  ('Rajula', 'રાજુલા'),
  ('Ranavav', 'રાણાવાવ'),
  ('Ranpur', 'રાણપુર'),
  ('Rapar', 'રાપર'),
  ('Sagbara', 'સાગબારા'),
  ('Sami', 'સામી'),
  ('Sanand', 'સાણંદ'),
  ('Sanjeli', 'સાંજેલી'),
  ('Sankheda', 'સંખેડા'),
  ('Sankheswar', 'સંખેશ્વર'),
  ('Santalpur', 'સંતલપુર'),
  ('Santrampur', 'સંતરામપુર'),
  ('Sarasvati', 'સરસ્વતી'),
  ('Sathamba', 'સાથંબા'),
  ('Satlasana', 'સતલાસણા'),
  ('Savarkundla', 'સાવરકુંડલા'),
  ('Savli', 'સાવલી'),
  ('Sayla', 'સાયલા'),
  ('Shamlaji', 'શામળાજી'),
  ('Shehera', 'શહેરા'),
  ('Sidhpur', 'સિદ્ધપુર'),
  ('Sihor', 'સિહોર'),
  ('Singvad', 'સિંગવડ'),
  ('Sinor', 'સિનોર'),
  ('Sojitra', 'સોજીત્રા'),
  ('Songadh', 'સોનગઢ'),
  ('Subir', 'સુબીર'),
  ('Suigam', 'સુઈગામ'),
  ('Sukhsar', 'સુખસર'),
  ('Surat', 'સુરત'),
  ('Sutrapada', 'સુત્રાપાડા'),
  ('Talaja', 'તળાજા'),
  ('Talala', 'તલાલા'),
  ('Talod', 'તલોદ'),
  ('Tankara', 'ટંકારા'),
  ('Tarapur', 'તારાપુર'),
  ('Thangadh', 'થાંગઢ'),
  ('Tharad', 'થરાદ'),
  ('Thasra', 'ઠાસરા'),
  ('Tilakwada', 'તિલકવાડા'),
  ('Uchhal', 'ઉચ્છલ'),
  ('Ukai', 'ઉકાઈ'),
  ('Umarpada', 'ઉમરપાડા'),
  ('Umbergaon', 'ઉમરગામ'),
  ('Umrala', 'ઉમરાળા'),
  ('Umreth', 'ઉમરેઠ'),
  ('Una', 'ઉના'),
  ('Unjha', 'ઉંઝા'),
  ('Upleta', 'ઉપલેટા'),
  ('Vadali', 'વડાલી'),
  ('Vadgam', 'વડગામ'),
  ('Vadnagar', 'વડનગર'),
  ('Vadodara', 'વડોદરા'),
  ('Vagra', 'વાગરા'),
  ('Valia', 'વાલિયા'),
  ('Vallabhipur', 'વલ્લભીપુર'),
  ('Valod', 'વાલોડ'),
  ('Valsad', 'વલસાડ'),
  ('Vansda', 'વાંસદા'),
  ('Vanthali', 'વંથલી'),
  ('Vapi', 'વાપી'),
  ('Vaso', 'વાસો'),
  ('Vav', 'વાવ'),
  ('Veraval', 'વેરાવળ'),
  ('Vijapur', 'વિજાપુર'),
  ('Vijaynagar', 'વિજયનગર'),
  ('Vinchchiya', 'વિંછિયા'),
  ('Viramgam', 'વિરમગામ'),
  ('Virpur', 'વીરપુર'),
  ('Visavadar', 'વીસાવદર'),
  ('Visnagar', 'વિસનગર'),
  ('Vyara', 'વ્યારા'),
  ('Wadhwan', 'વઢવાણ'),
  ('Waghai', 'વાઘઈ'),
  ('Waghodia', 'વાઘોડિયા'),
  ('Wankaner', 'વાંકાનેર')
) as v(name_en, name_gu) where p.name_en = v.name_en;

update public.gu_sro_offices s set name_gu = CASE
  WHEN name_en = 'Abdasa (Kutch)' THEN 'અબડાસા (કચ્છ)'
  WHEN name_en = 'Ahmedabad-1 (Ahmedabad)' THEN 'અમદાવાદ-1 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-10 (Ahmedabad)' THEN 'અમદાવાદ-10 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-11 (Ahmedabad)' THEN 'અમદાવાદ-11 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-12 (Ahmedabad)' THEN 'અમદાવાદ-12 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-2 (Ahmedabad)' THEN 'અમદાવાદ-2 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-3 (Ahmedabad)' THEN 'અમદાવાદ-3 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-4 (Ahmedabad)' THEN 'અમદાવાદ-4 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-5 (Ahmedabad)' THEN 'અમદાવાદ-5 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-6 (Ahmedabad)' THEN 'અમદાવાદ-6 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-7 (Ahmedabad)' THEN 'અમદાવાદ-7 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-8 (Ahmedabad)' THEN 'અમદાવાદ-8 (અમદાવાદ)'
  WHEN name_en = 'Ahmedabad-9 (Ahmedabad)' THEN 'અમદાવાદ-9 (અમદાવાદ)'
  WHEN name_en = 'Ahwa (Dang)' THEN 'આહવા (ડાંગ)'
  WHEN name_en = 'Ambika (Surat)' THEN 'અંબિકા (સુરત)'
  WHEN name_en = 'Amirgadh (Banaskantha)' THEN 'અમીરગઢ (બનાસકાંઠા)'
  WHEN name_en = 'Amod (Bharuch)' THEN 'આમોદ (ભરૂચ)'
  WHEN name_en = 'Amreli (Amreli)' THEN 'અમરેલી (અમરેલી)'
  WHEN name_en = 'Anand-1 (Anand)' THEN 'આણંદ-1 (આણંદ)'
  WHEN name_en = 'Anand-2 (Anand)' THEN 'આણંદ-2 (આણંદ)'
  WHEN name_en = 'Anjar (Kutch)' THEN 'અંજાર (કચ્છ)'
  WHEN name_en = 'Anklav (Anand)' THEN 'અંકલાવ (આણંદ)'
  WHEN name_en = 'Ankleshwar (Bharuch)' THEN 'અંકલેશ્વર (ભરૂચ)'
  WHEN name_en = 'Areth (Surat)' THEN 'અરેઠ (સુરત)'
  WHEN name_en = 'Babra (Amreli)' THEN 'બાબરા (અમરેલી)'
  WHEN name_en = 'Bagasara (Amreli)' THEN 'બગસરા (અમરેલી)'
  WHEN name_en = 'Balasinor (Mahisagar)' THEN 'બાલાસિનોર (મહીસાગર)'
  WHEN name_en = 'Bardoli (Surat)' THEN 'બારડોલી (સુરત)'
  WHEN name_en = 'Barwala (Botad)' THEN 'બરવાળા (બોટાદ)'
  WHEN name_en = 'Bavla (Ahmedabad)' THEN 'બાવળા (અમદાવાદ)'
  WHEN name_en = 'Bayad (Aravalli)' THEN 'બાયડ (અરવલ્લી)'
  WHEN name_en = 'Becharaji (Mehsana)' THEN 'બેચરાજી (મહેસાણા)'
  WHEN name_en = 'Bhabhar (Vav-Tharad)' THEN 'ભાભર (વાવ-થરાદ)'
  WHEN name_en = 'Bhachau (Kutch)' THEN 'ભચાઉ (કચ્છ)'
  WHEN name_en = 'Bhanvad (Devbhoomi Dwarka)' THEN 'ભાણવડ (દેવભૂમિ દ્વારકા)'
  WHEN name_en = 'Bharuch-1 (Bharuch)' THEN 'ભરૂચ-1 (ભરૂચ)'
  WHEN name_en = 'Bharuch-2 (Bharuch)' THEN 'ભરૂચ-2 (ભરૂચ)'
  WHEN name_en = 'Bhavnagar-1 (Bhavnagar)' THEN 'ભાવનગર-1 (ભાવનગર)'
  WHEN name_en = 'Bhavnagar-2 (Bhavnagar)' THEN 'ભાવનગર-2 (ભાવનગર)'
  WHEN name_en = 'Bhavnagar-3 (Bhavnagar)' THEN 'ભાવનગર-3 (ભાવનગર)'
  WHEN name_en = 'Bhesana (Junagadh)' THEN 'ભેસાણા (જૂનાગઢ)'
  WHEN name_en = 'Bhiloda (Aravalli)' THEN 'ભિલોડા (અરવલ્લી)'
  WHEN name_en = 'Bhuj (Kutch)' THEN 'ભુજ (કચ્છ)'
  WHEN name_en = 'Bodeli (Chhota Udaipur)' THEN 'બોડેલી (છોટાઉદેપુર)'
  WHEN name_en = 'Borsad (Anand)' THEN 'બોરસદ (આણંદ)'
  WHEN name_en = 'Botad (Botad)' THEN 'બોટાદ (બોટાદ)'
  WHEN name_en = 'Chanasma (Patan)' THEN 'ચાણસ્મા (પાટણ)'
  WHEN name_en = 'Chhota Udaipur (Chhota Udaipur)' THEN 'છોટાઉદેપુર (છોટાઉદેપુર)'
  WHEN name_en = 'Chikda (Narmada)' THEN 'ચીકડા (નર્મદા)'
  WHEN name_en = 'Chikhli (Navsari)' THEN 'ચીખલી (નવસારી)'
  WHEN name_en = 'Choryasi (Surat)' THEN 'ચોર્યાસી (સુરત)'
  WHEN name_en = 'Chotila (Surendranagar)' THEN 'ચોટીલા (સુરેન્દ્રનગર)'
  WHEN name_en = 'Chuda (Surendranagar)' THEN 'ચુડા (સુરેન્દ્રનગર)'
  WHEN name_en = 'Dabhoi (Vadodara)' THEN 'ડભોઈ (વડોદરા)'
  WHEN name_en = 'Dahod (Dahod)' THEN 'દાહોદ (દાહોદ)'
  WHEN name_en = 'Danta (Banaskantha)' THEN 'દાંતા (બનાસકાંઠા)'
  WHEN name_en = 'Dantiwada (Banaskantha)' THEN 'દાંતીવાડા (બનાસકાંઠા)'
  WHEN name_en = 'Dasada (Surendranagar)' THEN 'દસાડા (સુરેન્દ્રનગર)'
  WHEN name_en = 'Daskroi (Ahmedabad)' THEN 'દસક્રોઈ (અમદાવાદ)'
  WHEN name_en = 'Dediapada (Narmada)' THEN 'ડેડિયાપાડા (નર્મદા)'
  WHEN name_en = 'Deesa (Banaskantha)' THEN 'ડીસા (બનાસકાંઠા)'
  WHEN name_en = 'Dehgam (Gandhinagar)' THEN 'દેહગામ (ગાંધીનગર)'
  WHEN name_en = 'Deodar (Vav-Tharad)' THEN 'દેવદર (વાવ-થરાદ)'
  WHEN name_en = 'Desar (Vadodara)' THEN 'દેસર (વડોદરા)'
  WHEN name_en = 'Detroj-Rampura (Ahmedabad)' THEN 'દેત્રોજ-રામપુરા (અમદાવાદ)'
  WHEN name_en = 'Devgadh baria (Dahod)' THEN 'દેવગઢ બારિયા (દાહોદ)'
  WHEN name_en = 'Dhandhuka (Ahmedabad)' THEN 'ધંધુકા (અમદાવાદ)'
  WHEN name_en = 'Dhanera (Banaskantha)' THEN 'ધાનેરા (બનાસકાંઠા)'
  WHEN name_en = 'Dhanpur (Dahod)' THEN 'ધાનપુર (દાહોદ)'
  WHEN name_en = 'Dhansura (Aravalli)' THEN 'ધાનસુરા (અરવલ્લી)'
  WHEN name_en = 'Dharampur (Valsad)' THEN 'ધરમપુર (વલસાડ)'
  WHEN name_en = 'Dhari (Amreli)' THEN 'ધારી (અમરેલી)'
  WHEN name_en = 'Dharnidhar (Vav-Tharad)' THEN 'ધરણીધર (વાવ-થરાદ)'
  WHEN name_en = 'Dholera (Ahmedabad)' THEN 'ધોલેરા (અમદાવાદ)'
  WHEN name_en = 'Dholka (Ahmedabad)' THEN 'ધોલકા (અમદાવાદ)'
  WHEN name_en = 'Dhoraji (Rajkot)' THEN 'ધોરાજી (રાજકોટ)'
  WHEN name_en = 'Dhrangadhra (Surendranagar)' THEN 'ધ્રાંગધ્રા (સુરેન્દ્રનગર)'
  WHEN name_en = 'Dhrol (Jamnagar)' THEN 'ધ્રોલ (જામનગર)'
  WHEN name_en = 'Dolvan (Tapi)' THEN 'ડોલવણ (તાપી)'
  WHEN name_en = 'Fagvel (Kheda)' THEN 'ફાગવેલ (ખેડા)'
  WHEN name_en = 'Fatepura (Dahod)' THEN 'ફતેપુરા (દાહોદ)'
  WHEN name_en = 'Gadhada (Botad)' THEN 'ગઢડા (બોટાદ)'
  WHEN name_en = 'Galteshwar (Kheda)' THEN 'ગલ્તેશ્વર (ખેડા)'
  WHEN name_en = 'Gandevi (Navsari)' THEN 'ગણદેવી (નવસારી)'
  WHEN name_en = 'Gandhidham (Kutch)' THEN 'ગાંધીધામ (કચ્છ)'
  WHEN name_en = 'Gandhinagar-1 (Gandhinagar)' THEN 'ગાંધીનગર-1 (ગાંધીનગર)'
  WHEN name_en = 'Gandhinagar-2 (Gandhinagar)' THEN 'ગાંધીનગર-2 (ગાંધીનગર)'
  WHEN name_en = 'Garbada (Dahod)' THEN 'ગરબાડા (દાહોદ)'
  WHEN name_en = 'Gariadhar (Bhavnagar)' THEN 'ગારિયાધાર (ભાવનગર)'
  WHEN name_en = 'Garudeshwar (Narmada)' THEN 'ગરુડેશ્વર (નર્મદા)'
  WHEN name_en = 'Ghogha (Bhavnagar)' THEN 'ઘોઘા (ભાવનગર)'
  WHEN name_en = 'Ghoghamba (Panchmahal)' THEN 'ઘોઘંબા (પંચમહાલ)'
  WHEN name_en = 'Gir-Gadhada (Gir Somnath)' THEN 'ગીર-ગઢડા (ગીર સોમનાથ)'
  WHEN name_en = 'Godhar(Gujarat) (Mahisagar)' THEN 'Godhar (Gujarat) (Mahisagar)'
  WHEN name_en = 'Godhra (Panchmahal)' THEN 'ગોધરા (પંચમહાલ)'
  WHEN name_en = 'Gondal (Rajkot)' THEN 'ગોંડલ (રાજકોટ)'
  WHEN name_en = 'Guru Govind Limdi (Dahod)' THEN 'ગુરુ ગોવિંદ લીમડી (દાહોદ)'
  WHEN name_en = 'Hadad (Banaskantha)' THEN 'હડદ (બનાસકાંઠા)'
  WHEN name_en = 'Halol (Panchmahal)' THEN 'હાલોલ (પંચમહાલ)'
  WHEN name_en = 'Halvad (Morbi)' THEN 'હળવદ (મોરબી)'
  WHEN name_en = 'Hansot (Bharuch)' THEN 'હાંસોટ (ભરૂચ)'
  WHEN name_en = 'Harij (Patan)' THEN 'હરીજ (પાટણ)'
  WHEN name_en = 'Himatnagar (Sabarkantha)' THEN 'હિંમતનગર (સાબરકાંઠા)'
  WHEN name_en = 'Idar (Sabarkantha)' THEN 'ઈડર (સાબરકાંઠા)'
  WHEN name_en = 'Jafrabad (Amreli)' THEN 'જાફરાબાદ (અમરેલી)'
  WHEN name_en = 'Jalalpore (Navsari)' THEN 'જલાલપોર (નવસારી)'
  WHEN name_en = 'Jambughoda (Panchmahal)' THEN 'જાંબુઘોડા (પંચમહાલ)'
  WHEN name_en = 'Jambusar (Bharuch)' THEN 'જંબુસર (ભરૂચ)'
  WHEN name_en = 'Jamjodhpur (Jamnagar)' THEN 'જામજોધપુર (જામનગર)'
  WHEN name_en = 'Jamkandorna (Rajkot)' THEN 'જામકંડોરણા (રાજકોટ)'
  WHEN name_en = 'Jamnagar-1 (Jamnagar)' THEN 'જામનગર-1 (જામનગર)'
  WHEN name_en = 'Jamnagar-2 (Jamnagar)' THEN 'જામનગર-2 (જામનગર)'
  WHEN name_en = 'Jamnagar-3 (Jamnagar)' THEN 'જામનગર-3 (જામનગર)'
  WHEN name_en = 'Jasdan (Rajkot)' THEN 'જસદણ (રાજકોટ)'
  WHEN name_en = 'Jesar (Bhavnagar)' THEN 'જેસર (ભાવનગર)'
  WHEN name_en = 'Jetpur (Rajkot)' THEN 'જેતપુર (રાજકોટ)'
  WHEN name_en = 'Jetpur pavi (Chhota Udaipur)' THEN 'જેતપુર પાવી (છોટાઉદેપુર)'
  WHEN name_en = 'Jhagadia (Bharuch)' THEN 'ઝઘડિયા (ભરૂચ)'
  WHEN name_en = 'Jhalod (Dahod)' THEN 'ઝાલોદ (દાહોદ)'
  WHEN name_en = 'Jodiya (Jamnagar)' THEN 'જોડિયા (જામનગર)'
  WHEN name_en = 'Jotana (Mehsana)' THEN 'જોટાણા (મહેસાણા)'
  WHEN name_en = 'Junagadh Rural (Junagadh)' THEN 'જૂનાગઢ ગ્રામ્ય (જૂનાગઢ)'
  WHEN name_en = 'Junagadh-1 (Junagadh)' THEN 'જૂનાગઢ-1 (જૂનાગઢ)'
  WHEN name_en = 'Junagadh-2 (Junagadh)' THEN 'જૂનાગઢ-2 (જૂનાગઢ)'
  WHEN name_en = 'Kadana (Mahisagar)' THEN 'કડાણા (મહીસાગર)'
  WHEN name_en = 'Kadi (Mehsana)' THEN 'કડી (મહેસાણા)'
  WHEN name_en = 'Kadwal (Chhota Udaipur)' THEN 'કડવાલ (છોટાઉદેપુર)'
  WHEN name_en = 'Kalavad (Jamnagar)' THEN 'કાલાવડ (જામનગર)'
  WHEN name_en = 'Kalol (Gandhinagar)' THEN 'કલોલ (ગાંધીનગર)'
  WHEN name_en = 'Kalol (Panchmahal)' THEN 'કલોલ (પંચમહાલ)'
  WHEN name_en = 'Kalyanpur (Devbhoomi Dwarka)' THEN 'કલ્યાણપુર (દેવભૂમિ દ્વારકા)'
  WHEN name_en = 'Kamrej (Surat)' THEN 'કામરેજ (સુરત)'
  WHEN name_en = 'Kankrej(Shihori (Banaskantha)' THEN 'Kankrej (Shihori (Banaskantha)'
  WHEN name_en = 'Kapadvanj (Kheda)' THEN 'કપડવંજ (ખેડા)'
  WHEN name_en = 'Kaprada (Valsad)' THEN 'કપરાડા (વલસાડ)'
  WHEN name_en = 'Karjan (Vadodara)' THEN 'કરજણ (વડોદરા)'
  WHEN name_en = 'Kathlal (Kheda)' THEN 'કઠલાલ (ખેડા)'
  WHEN name_en = 'Kavant (Chhota Udaipur)' THEN 'કાવંત (છોટાઉદેપુર)'
  WHEN name_en = 'Keshod (Junagadh)' THEN 'કેશોદ (જૂનાગઢ)'
  WHEN name_en = 'Khambha (Amreli)' THEN 'ખાંભા (અમરેલી)'
  WHEN name_en = 'Khambhalia (Devbhoomi Dwarka)' THEN 'ખંભાળિયા (દેવભૂમિ દ્વારકા)'
  WHEN name_en = 'Khambhat (Anand)' THEN 'ખંભાત (આણંદ)'
  WHEN name_en = 'Khanpur (Mahisagar)' THEN 'ખાનપુર (મહીસાગર)'
  WHEN name_en = 'Kheda (Kheda)' THEN 'ખેડા (ખેડા)'
  WHEN name_en = 'Khedbrahma (Sabarkantha)' THEN 'ખેડબ્રહ્મા (સાબરકાંઠા)'
  WHEN name_en = 'Kheralu (Mehsana)' THEN 'ખેરાલુ (મહેસાણા)'
  WHEN name_en = 'Khergam (Navsari)' THEN 'ખેરગામ (નવસારી)'
  WHEN name_en = 'Kodinar (Gir Somnath)' THEN 'કોડીનાર (ગીર સોમનાથ)'
  WHEN name_en = 'Kotada Sangani (Rajkot)' THEN 'કોટડા સાંગાણી (રાજકોટ)'
  WHEN name_en = 'Kothamba (Mahisagar)' THEN 'કોઠંબા (મહીસાગર)'
  WHEN name_en = 'Kukarmunda (Tapi)' THEN 'કુકરમુંડા (તાપી)'
  WHEN name_en = 'Kunkavav vadia (Amreli)' THEN 'કુંકાવાવ વડિયા (અમરેલી)'
  WHEN name_en = 'Kutiyana (Porbandar)' THEN 'કુતિયાણા (પોરબંદર)'
  WHEN name_en = 'Lakhani (Vav-Tharad)' THEN 'લાખાણી (વાવ-થરાદ)'
  WHEN name_en = 'Lakhpat (Kutch)' THEN 'લખપત (કચ્છ)'
  WHEN name_en = 'Lakhtar (Surendranagar)' THEN 'લખતર (સુરેન્દ્રનગર)'
  WHEN name_en = 'Lalpur (Jamnagar)' THEN 'લાલપુર (જામનગર)'
  WHEN name_en = 'Lathi (Amreli)' THEN 'લાઠી (અમરેલી)'
  WHEN name_en = 'Lilia (Amreli)' THEN 'લીલીયા (અમરેલી)'
  WHEN name_en = 'Limbdi (Surendranagar)' THEN 'લીમડી (સુરેન્દ્રનગર)'
  WHEN name_en = 'Limkheda (Dahod)' THEN 'લીમખેડા (દાહોદ)'
  WHEN name_en = 'Lodhika (Rajkot)' THEN 'લોધીકા (રાજકોટ)'
  WHEN name_en = 'Lunawada (Mahisagar)' THEN 'લુણાવાડા (મહીસાગર)'
  WHEN name_en = 'Mahudha (Kheda)' THEN 'મહુધા (ખેડા)'
  WHEN name_en = 'Mahuva (Bhavnagar)' THEN 'મહુવા (ભાવનગર)'
  WHEN name_en = 'Mahuva (Surat)' THEN 'મહુવા (સુરત)'
  WHEN name_en = 'Malia (Junagadh)' THEN 'માલિયા (જૂનાગઢ)'
  WHEN name_en = 'Maliya (Morbi)' THEN 'માલિયા (મોરબી)'
  WHEN name_en = 'Malpur (Aravalli)' THEN 'માલપુર (અરવલ્લી)'
  WHEN name_en = 'Manavadar (Junagadh)' THEN 'માણાવદર (જૂનાગઢ)'
  WHEN name_en = 'Mandal (Ahmedabad)' THEN 'માંડલ (અમદાવાદ)'
  WHEN name_en = 'Mandvi (Kutch)' THEN 'માંડવી (કચ્છ)'
  WHEN name_en = 'Mandvi (Surat)' THEN 'માંડવી (સુરત)'
  WHEN name_en = 'Mangrol (Junagadh)' THEN 'માંગરોળ (જૂનાગઢ)'
  WHEN name_en = 'Mangrol (Surat)' THEN 'માંગરોળ (સુરત)'
  WHEN name_en = 'Mansa (Gandhinagar)' THEN 'માંસા (ગાંધીનગર)'
  WHEN name_en = 'Matar (Kheda)' THEN 'માતર (ખેડા)'
  WHEN name_en = 'Meghraj (Aravalli)' THEN 'મેઘરાજ (અરવલ્લી)'
  WHEN name_en = 'Mehmedabad (Kheda)' THEN 'મહેમદાવાદ (ખેડા)'
  WHEN name_en = 'Mehsana-1 (Mehsana)' THEN 'મહેસાણા-1 (મહેસાણા)'
  WHEN name_en = 'Mehsana-2 (Mehsana)' THEN 'મહેસાણા-2 (મહેસાણા)'
  WHEN name_en = 'Mendarda (Junagadh)' THEN 'મેન્દરડા (જૂનાગઢ)'
  WHEN name_en = 'Modasa (Aravalli)' THEN 'મોડાસા (અરવલ્લી)'
  WHEN name_en = 'Morbi-1 (Morbi)' THEN 'મોરબી-1 (મોરબી)'
  WHEN name_en = 'Morbi-2 (Morbi)' THEN 'મોરબી-2 (મોરબી)'
  WHEN name_en = 'Morwa Hadaf (Panchmahal)' THEN 'મોરવા હાડફ (પંચમહાલ)'
  WHEN name_en = 'Muli (Surendranagar)' THEN 'મૂળી (સુરેન્દ્રનગર)'
  WHEN name_en = 'Mundra (Kutch)' THEN 'મુંદ્રા (કચ્છ)'
  WHEN name_en = 'Nadiad (Kheda)' THEN 'નડિયાદ (ખેડા)'
  WHEN name_en = 'Nakhatrana (Kutch)' THEN 'નખત્રાણા (કચ્છ)'
  WHEN name_en = 'Nana Pondha (Valsad)' THEN 'નાના પોંઢા (વલસાડ)'
  WHEN name_en = 'Nandod (Narmada)' THEN 'નાંદોદ (નર્મદા)'
  WHEN name_en = 'Nasvadi (Chhota Udaipur)' THEN 'નસવાડી (છોટાઉદેપુર)'
  WHEN name_en = 'Navsari-1 (Navsari)' THEN 'નવસારી-1 (નવસારી)'
  WHEN name_en = 'Navsari-2 (Navsari)' THEN 'નવસારી-2 (નવસારી)'
  WHEN name_en = 'Netrang (Bharuch)' THEN 'નેત્રંગ (ભરૂચ)'
  WHEN name_en = 'Nizar (Tapi)' THEN 'નિઝર (તાપી)'
  WHEN name_en = 'Ogad(Thara) (Banaskantha)' THEN 'Ogad (Thara) (Banaskantha)'
  WHEN name_en = 'Okhamandal (Devbhoomi Dwarka)' THEN 'ઓખામંડળ (દેવભૂમિ દ્વારકા)'
  WHEN name_en = 'Olpad (Surat)' THEN 'ઓલપાડ (સુરત)'
  WHEN name_en = 'Paddhari (Rajkot)' THEN 'પડધરી (રાજકોટ)'
  WHEN name_en = 'Padra (Vadodara)' THEN 'પાદરા (વડોદરા)'
  WHEN name_en = 'Palanpur (Banaskantha)' THEN 'પાલનપુર (બનાસકાંઠા)'
  WHEN name_en = 'Palitana (Bhavnagar)' THEN 'પાલીતાણા (ભાવનગર)'
  WHEN name_en = 'Palsana (Surat)' THEN 'પલસાણા (સુરત)'
  WHEN name_en = 'Pardi (Valsad)' THEN 'પારડી (વલસાડ)'
  WHEN name_en = 'Patan (Patan)' THEN 'પાટણ (પાટણ)'
  WHEN name_en = 'Petlad (Anand)' THEN 'પેટલાદ (આણંદ)'
  WHEN name_en = 'Porbandar (Porbandar)' THEN 'પોરબંદર (પોરબંદર)'
  WHEN name_en = 'Poshina (Sabarkantha)' THEN 'પોશીના (સાબરકાંઠા)'
  WHEN name_en = 'Prantij (Sabarkantha)' THEN 'પ્રાંતિજ (સાબરકાંઠા)'
  WHEN name_en = 'Radhanpur (Patan)' THEN 'રાધનપુર (પાટણ)'
  WHEN name_en = 'Rah (Vav-Tharad)' THEN 'રાહ (વાવ-થરાદ)'
  WHEN name_en = 'Rajkot-1 (Rajkot)' THEN 'રાજકોટ-1 (રાજકોટ)'
  WHEN name_en = 'Rajkot-2 (Rajkot)' THEN 'રાજકોટ-2 (રાજકોટ)'
  WHEN name_en = 'Rajkot-3 (Rajkot)' THEN 'રાજકોટ-3 (રાજકોટ)'
  WHEN name_en = 'Rajkot-4 (Rajkot)' THEN 'રાજકોટ-4 (રાજકોટ)'
  WHEN name_en = 'Rajula (Amreli)' THEN 'રાજુલા (અમરેલી)'
  WHEN name_en = 'Ranavav (Porbandar)' THEN 'રાણાવાવ (પોરબંદર)'
  WHEN name_en = 'Ranpur (Botad)' THEN 'રાણપુર (બોટાદ)'
  WHEN name_en = 'Rapar (Kutch)' THEN 'રાપર (કચ્છ)'
  WHEN name_en = 'Sagbara (Narmada)' THEN 'સાગબારા (નર્મદા)'
  WHEN name_en = 'Sami (Patan)' THEN 'સામી (પાટણ)'
  WHEN name_en = 'Sanand (Ahmedabad)' THEN 'સાણંદ (અમદાવાદ)'
  WHEN name_en = 'Sanjeli (Dahod)' THEN 'સાંજેલી (દાહોદ)'
  WHEN name_en = 'Sankheda (Chhota Udaipur)' THEN 'સંખેડા (છોટાઉદેપુર)'
  WHEN name_en = 'Sankheswar (Patan)' THEN 'સંખેશ્વર (પાટણ)'
  WHEN name_en = 'Santalpur (Patan)' THEN 'સંતલપુર (પાટણ)'
  WHEN name_en = 'Santrampur (Mahisagar)' THEN 'સંતરામપુર (મહીસાગર)'
  WHEN name_en = 'Sarasvati (Patan)' THEN 'સરસ્વતી (પાટણ)'
  WHEN name_en = 'Sathamba (Aravalli)' THEN 'સાથંબા (અરવલ્લી)'
  WHEN name_en = 'Satlasana (Mehsana)' THEN 'સતલાસણા (મહેસાણા)'
  WHEN name_en = 'Savarkundla (Amreli)' THEN 'સાવરકુંડલા (અમરેલી)'
  WHEN name_en = 'Savli (Vadodara)' THEN 'સાવલી (વડોદરા)'
  WHEN name_en = 'Sayla (Surendranagar)' THEN 'સાયલા (સુરેન્દ્રનગર)'
  WHEN name_en = 'Shamlaji (Aravalli)' THEN 'શામળાજી (અરવલ્લી)'
  WHEN name_en = 'Shehera (Panchmahal)' THEN 'શહેરા (પંચમહાલ)'
  WHEN name_en = 'Sidhpur (Patan)' THEN 'સિદ્ધપુર (પાટણ)'
  WHEN name_en = 'Sihor (Bhavnagar)' THEN 'સિહોર (ભાવનગર)'
  WHEN name_en = 'Singvad (Dahod)' THEN 'સિંગવડ (દાહોદ)'
  WHEN name_en = 'Sinor (Vadodara)' THEN 'સિનોર (વડોદરા)'
  WHEN name_en = 'Sojitra (Anand)' THEN 'સોજીત્રા (આણંદ)'
  WHEN name_en = 'Songadh (Tapi)' THEN 'સોનગઢ (તાપી)'
  WHEN name_en = 'Subir (Dang)' THEN 'સુબીર (ડાંગ)'
  WHEN name_en = 'Suigam (Vav-Tharad)' THEN 'સુઈગામ (વાવ-થરાદ)'
  WHEN name_en = 'Sukhsar (Dahod)' THEN 'સુખસર (દાહોદ)'
  WHEN name_en = 'Surat-1 (Surat)' THEN 'સુરત-1 (સુરત)'
  WHEN name_en = 'Surat-10 (Surat)' THEN 'સુરત-10 (સુરત)'
  WHEN name_en = 'Surat-2 (Surat)' THEN 'સુરત-2 (સુરત)'
  WHEN name_en = 'Surat-3 (Surat)' THEN 'સુરત-3 (સુરત)'
  WHEN name_en = 'Surat-4 (Surat)' THEN 'સુરત-4 (સુરત)'
  WHEN name_en = 'Surat-5 (Surat)' THEN 'સુરત-5 (સુરત)'
  WHEN name_en = 'Surat-6 (Surat)' THEN 'સુરત-6 (સુરત)'
  WHEN name_en = 'Surat-7 (Surat)' THEN 'સુરત-7 (સુરત)'
  WHEN name_en = 'Surat-8 (Surat)' THEN 'સુરત-8 (સુરત)'
  WHEN name_en = 'Surat-9 (Surat)' THEN 'સુરત-9 (સુરત)'
  WHEN name_en = 'Sutrapada (Gir Somnath)' THEN 'સુત્રાપાડા (ગીર સોમનાથ)'
  WHEN name_en = 'Talaja (Bhavnagar)' THEN 'તળાજા (ભાવનગર)'
  WHEN name_en = 'Talala (Gir Somnath)' THEN 'તલાલા (ગીર સોમનાથ)'
  WHEN name_en = 'Talod (Sabarkantha)' THEN 'તલોદ (સાબરકાંઠા)'
  WHEN name_en = 'Tankara (Morbi)' THEN 'ટંકારા (મોરબી)'
  WHEN name_en = 'Tarapur (Anand)' THEN 'તારાપુર (આણંદ)'
  WHEN name_en = 'Thangadh (Surendranagar)' THEN 'થાંગઢ (સુરેન્દ્રનગર)'
  WHEN name_en = 'Tharad (Vav-Tharad)' THEN 'થરાદ (વાવ-થરાદ)'
  WHEN name_en = 'Thasra (Kheda)' THEN 'ઠાસરા (ખેડા)'
  WHEN name_en = 'Tilakwada (Narmada)' THEN 'તિલકવાડા (નર્મદા)'
  WHEN name_en = 'Uchhal (Tapi)' THEN 'ઉચ્છલ (તાપી)'
  WHEN name_en = 'Ukai (Tapi)' THEN 'ઉકાઈ (તાપી)'
  WHEN name_en = 'Umarpada (Surat)' THEN 'ઉમરપાડા (સુરત)'
  WHEN name_en = 'Umbergaon (Valsad)' THEN 'ઉમરગામ (વલસાડ)'
  WHEN name_en = 'Umrala (Bhavnagar)' THEN 'ઉમરાળા (ભાવનગર)'
  WHEN name_en = 'Umreth (Anand)' THEN 'ઉમરેઠ (આણંદ)'
  WHEN name_en = 'Una (Gir Somnath)' THEN 'ઉના (ગીર સોમનાથ)'
  WHEN name_en = 'Unjha (Mehsana)' THEN 'ઉંઝા (મહેસાણા)'
  WHEN name_en = 'Upleta (Rajkot)' THEN 'ઉપલેટા (રાજકોટ)'
  WHEN name_en = 'Vadali (Sabarkantha)' THEN 'વડાલી (સાબરકાંઠા)'
  WHEN name_en = 'Vadgam (Banaskantha)' THEN 'વડગામ (બનાસકાંઠા)'
  WHEN name_en = 'Vadnagar (Mehsana)' THEN 'વડનગર (મહેસાણા)'
  WHEN name_en = 'Vadodara-1 (Vadodara)' THEN 'વડોદરા-1 (વડોદરા)'
  WHEN name_en = 'Vadodara-2 (Vadodara)' THEN 'વડોદરા-2 (વડોદરા)'
  WHEN name_en = 'Vadodara-3 (Vadodara)' THEN 'વડોદરા-3 (વડોદરા)'
  WHEN name_en = 'Vadodara-4 (Vadodara)' THEN 'વડોદરા-4 (વડોદરા)'
  WHEN name_en = 'Vadodara-5 (Vadodara)' THEN 'વડોદરા-5 (વડોદરા)'
  WHEN name_en = 'Vadodara-6 (Vadodara)' THEN 'વડોદરા-6 (વડોદરા)'
  WHEN name_en = 'Vadodara-7 (Vadodara)' THEN 'વડોદરા-7 (વડોદરા)'
  WHEN name_en = 'Vadodara-8 (Vadodara)' THEN 'વડોદરા-8 (વડોદરા)'
  WHEN name_en = 'Vagra (Bharuch)' THEN 'વાગરા (ભરૂચ)'
  WHEN name_en = 'Valia (Bharuch)' THEN 'વાલિયા (ભરૂચ)'
  WHEN name_en = 'Vallabhipur (Bhavnagar)' THEN 'વલ્લભીપુર (ભાવનગર)'
  WHEN name_en = 'Valod (Tapi)' THEN 'વાલોડ (તાપી)'
  WHEN name_en = 'Valsad (Valsad)' THEN 'વલસાડ (વલસાડ)'
  WHEN name_en = 'Vansda (Navsari)' THEN 'વાંસદા (નવસારી)'
  WHEN name_en = 'Vanthali (Junagadh)' THEN 'વંથલી (જૂનાગઢ)'
  WHEN name_en = 'Vapi (Valsad)' THEN 'વાપી (વલસાડ)'
  WHEN name_en = 'Vaso (Kheda)' THEN 'વાસો (ખેડા)'
  WHEN name_en = 'Vav (Vav-Tharad)' THEN 'વાવ (વાવ-થરાદ)'
  WHEN name_en = 'Veraval (Gir Somnath)' THEN 'વેરાવળ (ગીર સોમનાથ)'
  WHEN name_en = 'Vijapur (Mehsana)' THEN 'વિજાપુર (મહેસાણા)'
  WHEN name_en = 'Vijaynagar (Sabarkantha)' THEN 'વિજયનગર (સાબરકાંઠા)'
  WHEN name_en = 'Vinchchiya (Rajkot)' THEN 'વિંછિયા (રાજકોટ)'
  WHEN name_en = 'Viramgam (Ahmedabad)' THEN 'વિરમગામ (અમદાવાદ)'
  WHEN name_en = 'Virpur (Mahisagar)' THEN 'વીરપુર (મહીસાગર)'
  WHEN name_en = 'Visavadar (Junagadh)' THEN 'વીસાવદર (જૂનાગઢ)'
  WHEN name_en = 'Visnagar (Mehsana)' THEN 'વિસનગર (મહેસાણા)'
  WHEN name_en = 'Vyara (Tapi)' THEN 'વ્યારા (તાપી)'
  WHEN name_en = 'Wadhwan (Surendranagar)' THEN 'વઢવાણ (સુરેન્દ્રનગર)'
  WHEN name_en = 'Waghai (Dang)' THEN 'વાઘઈ (ડાંગ)'
  WHEN name_en = 'Waghodia (Vadodara)' THEN 'વાઘોડિયા (વડોદરા)'
  WHEN name_en = 'Wankaner (Morbi)' THEN 'વાંકાનેર (મોરબી)'
  ELSE name_gu END;
