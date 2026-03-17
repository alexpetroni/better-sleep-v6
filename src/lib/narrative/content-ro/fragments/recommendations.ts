/** Recommendation prose fragments, keyed by recommendation id */
export const recommendationProse: Record<string, string> = {
	// Tier 1 - Root cause
	get_sleep_study:
		'Fa un studiu de somn. Pe baza raspunsurilor tale, exista suficienti indicatori legati de caile respiratorii incat trebuie sa excludem — sau sa confirmam — apneea obstructiva de somn inainte de orice altceva. Daca caile tale respiratorii se prabusesc in timpul somnului, nicio schimbare comportamentala nu va rezolva efectele din aval. Acesta e pasul cu cel mai mare impact.',

	neuro_evaluation:
		'Consulta un neurolog legat de comportamentul de actare a viselor. A actiona fizic visele — sa lovesti, sa dai cu piciorul, sa cazi din pat — e o conditie specifica numita tulburare de comportament in somnul REM, si necesita evaluare profesionala atat pentru siguranta ta cat si pentru ca poate fi un marker timpuriu pentru alte conditii neurologice.',

	stimulus_control:
		'Rupe asocierea pat-stare de veghe. Asta inseamna: patul e doar pentru somn si intimitate. Daca nu adormi in 20 de minute, ridica-te. Mergi in alta camera. Fa ceva plictisitor in lumina slaba. Intoarce-te cand te simti somnoros. Da, asta pare contraintuitiv cand esti epuizat. Dar acum creierul tau a invatat ca pat inseamna frustrare si efort. Trebuie sa reantrenezi acea asociere, si singurul mod e sa incetezi sa o mai intaresti pe cea veche.',

	circadian_realignment:
		'Fixeaza o ora constanta de trezire — aceeasi in fiecare zi, inclusiv weekend, intr-o fereastra de 30 de minute. Aceasta e cea mai puternica interventie circadiana. Varful tau de cortizol de dimineata are nevoie de o ancora previzibila. In 20 de minute de la trezire, iesi afara. Lumina naturala directa pe fata timp de 10-15 minute. Chiar si pe cer acoperit e bine — lumina de afara e cu ordine de marime mai puternica decat cea de interior. Asta iti reseteaza ceasul principal mai puternic decat orice supliment.',

	nervous_system_regulation:
		'Incepe o practica zilnica de reglare a sistemului nervos. Nu e meditatie in sensul traditional — e vorba de a oferi sistemului tau nervos autonom semnale explicite de "siguranta." Varianta cea mai simpla: 5 minute de suspin fiziologic (dubla inspiratie pe nas, expiratie lunga pe gura). Fa asta de 2-3 ori pe zi, inclusiv o data in ora dinaintea culcarii. Ii predai trunchiului cerebral ca amenintarea s-a terminat.',

	cognitive_wind_down:
		'Creeaza o practica structurata de descarcare a grijilor. Cu treizeci de minute inainte sa inceapa relaxarea de seara, aseaza-te cu o foaie de hartie si scrie tot ce ai pe suflet — sarcini, griji, ganduri neterminate. Da fiecaruia un pas urmator sau o eticheta de "nu acum." Scopul e sa externalizezi incarcatura mentala ca sa nu mai incerce creierul tau sa o tina toata in memoria de lucru cand te intinzi.',

	// Tier 2 - Remove amplifiers
	environment_light:
		'Rezolva situatia cu lumina din dormitor. Ai nevoie de intuneric — intuneric pe bune, nu "destul de intuneric." Perdele blackout sau masca de somn. Acopera orice LED de standby cu banda adeziva. Creierul tau detecteaza lumina prin pleoape inchise si o foloseste sa calibreze profunzimea somnului.',

	environment_sound:
		'Adreseaza zgomotul. O sursa de sunet constanta — un ventilator sau un aparat de zgomot alb — e mai eficienta decat dopurile de urechi pentru ca mascheaza sunetele variabile in loc sa le blocheze. Problema nu e volumul, ci variabilitatea. Creierul tau e programat sa alerteze la schimbari in mediul sonor.',

	environment_temp:
		'Regleaza temperatura. Tinteste 18-20°C. Temperatura centrala a corpului trebuie sa scada pentru a initia somnul. Daca camera e prea calda, corpul tau nu poate completa acea cascada termica. O camera mai rece cu suficiente paturi ca sa te simti confortabil e tinta.',

	caffeine_cutoff:
		'Muta limita de cafeina la inainte de pranz. Fara exceptii. Cafeina are un timp de injumatatire de 5-6 ore, ceea ce inseamna ca o cafea de la 14:00 e inca la 25% putere la miezul noptii. Nu trebuie sa renunti la cafeina — doar protejeaza a doua jumatate a zilei.',

	alcohol_review:
		'Daca bei seara, opreste-te doua saptamani si observa ce se intampla cu somnul tau. Nu permanent — doar ca un diagnostic. Alcoolul te sedeaza sa adormi dar distruge a doua jumatate a noptii. Majoritatea oamenilor care incearca asta sunt surprinsi de cat de diferit devine somnul lor intre 3 si 6 dimineata.',

	gerd_management:
		'Adreseaza refluxul inainte de culcare. Ridica putin capul patului (o perna wedge functioneaza), inceteaza sa mananci cu 3 ore inainte de culcare si evita alimentele declansatoare seara. Cand acidul gastric urca in timp ce esti intins, declanseaza micro-treziri chiar daca nu te trezesti complet.',

	mental_health_support:
		'Ia in considerare sa te conectezi cu un terapeut, in mod specific unul instruit in CBT-I (terapie cognitiv-comportamentala pentru insomnie) sau, daca scorurile de dispozitie si anxietate raman ridicate, cineva care sa le poata adresa pe amandoua. Asta nu e o recomandare de slabiciune — e o recunoastere ca dimensiunea emotionala e un factor principal aici, si suportul specializat va accelera tot restul.',

	// Tier 3 - Optimize
	morning_light:
		'Expune-te la lumina soarelui dimineata in 30 de minute de la trezire. Zece pana la cincisprezece minute de lumina naturala directa de afara. Asta e cel mai puternic semnal circadian pe care il poate primi corpul tau, si seteaza cascada de eliberare a melatoninei la 14-16 ore distanta.',

	consistent_schedule:
		'Inasprete-ti programul de somn. Aceeasi ora de culcare si trezire, 7 zile pe saptamana, intr-o fereastra de 30 de minute. Corpul tau functioneaza pe baza de predictie. De fiecare data cand programul se schimba, ceasul intern are nevoie de 1-2 zile sa se recalibreze.',

	wind_down_routine:
		'Construieste o pista de relaxare de 45 de minute inainte de somn. Ecrane oprite, lumini diminuate si o secventa repetabila de activitati calme — nu conteaza prea mult ce sunt, atata timp cat sunt plictisitoare si consistente. Sistemul tau nervos invata prin repetitie ca aceasta secventa inseamna "incepe sa te opresti."',

	magnesium:
		'Adauga magneziu glicinat inainte de culcare, in jur de 200-400mg. Majoritatea oamenilor sunt deficitari, si aceasta forma specifica ajuta atat la relaxarea musculara cat si la calmarea sistemului nervos. E bland — nimic dramatic — dar sustine procesul.',

	ashwagandha:
		'Ia in considerare un adaptogen precum ashwagandha (in mod specific extractul KSM-66, 300mg de doua ori pe zi). Exista dovezi decente ca ajuta la modularea raspunsului de cortizol in timp. Nu e o pastila magica, dar e o unealta utila odata ce piesele de stil de viata sunt la locul lor.',

	stress_discharge:
		'Adauga o practica deliberata de descarcare a stresului. Poate fi exercitii de respiratie, poate fi un antrenament intens, pot fi 10 minute de ceva meditativ. Ideea e sa oferi sistemului tau nervos un semnal clar ca amenintarea s-a terminat si ca poate sa se relaxeze. Stresul cronic tine sistemul in modul "poate ca e un tigru." Trebuie sa completezi ciclul stresului, nu doar sa il gestionezi.'
};
