fun CPN'OGOID4854(CPN'inst,CPN'BTTID4854 CPN'b)=
(CPN'transitionID4854.CPN'occfun(CPN'inst,CPN'b,false);
CPN'BRTTID4854 (!CPN'BRID4854)) 
fun CPN'OGOID4584(CPN'inst,CPN'BTTID4584 CPN'b)=
(CPN'transitionID4584.CPN'occfun(CPN'inst,CPN'b,false);
CPN'BRTTID4584 (!CPN'BRID4584)) 
fun CPN'OGOID4114(CPN'inst,CPN'BTTID4114 CPN'b)=
(CPN'transitionID4114.CPN'occfun(CPN'inst,CPN'b,false);
CPN'BRTTID4114 (!CPN'BRID4114)) 
fun CPN'OGOID3185(CPN'inst,CPN'BTTID3185 CPN'b)=
(CPN'transitionID3185.CPN'occfun(CPN'inst,CPN'b,false);
CPN'BRTTID3185 (!CPN'BRID3185)) 
fun CPN'OGOID3060(CPN'inst,CPN'BTTID3060 CPN'b)=
(CPN'transitionID3060.CPN'occfun(CPN'inst,CPN'b,false);
CPN'BRTTID3060 (!CPN'BRID3060)) 
fun CPN'OGEID4854(CPN'inst,CPN'cand)=
CPN'OGEnabData.add_cand(CPN'cand,
map CPN'BTID4854conv
(CPN'transitionID4854.CPN'bindings(CPN'inst)))
fun CPN'OGEID4584(CPN'inst,CPN'cand)=
CPN'OGEnabData.add_cand(CPN'cand,
map CPN'BTID4584conv
(CPN'transitionID4584.CPN'bindings(CPN'inst)))
fun CPN'OGEID4114(CPN'inst,CPN'cand)=
CPN'OGEnabData.add_cand(CPN'cand,
map CPN'BTID4114conv
(CPN'transitionID4114.CPN'bindings(CPN'inst)))
fun CPN'OGEID3185(CPN'inst,CPN'cand)=
CPN'OGEnabData.add_cand(CPN'cand,
map CPN'BTID3185conv
(CPN'transitionID3185.CPN'bindings(CPN'inst)))
fun CPN'OGEID3060(CPN'inst,CPN'cand)=
CPN'OGEnabData.add_cand(CPN'cand,
map CPN'BTID3060conv
(CPN'transitionID3060.CPN'bindings(CPN'inst)))
fun CPN'OGCalcEnab()= (CPN'Sim.reset_scheduler();
if CPN'Sim.check_enab("ID4584",1) then CPN'OGEID4584(1,("ID4584",1)) else ();
if CPN'Sim.check_enab("ID4854",1) then CPN'OGEID4854(1,("ID4854",1)) else ();
if CPN'Sim.check_enab("ID4114",1) then CPN'OGEID4114(1,("ID4114",1)) else ();
if CPN'Sim.check_enab("ID3185",1) then CPN'OGEID3185(1,("ID3185",1)) else ();
if CPN'Sim.check_enab("ID3060",1) then CPN'OGEID3060(1,("ID3060",1)) else (); 
 (if CPN'OGEnabData.get_cands() = [] andalso  (#1(CPN'Sim.increase_model_time())) then CPN'OGCalcEnab() else ()));
fun CPN'OGExecute0 _ = raise IllegalId;
fun CPN'OGExecute1 (("ID4584",1),CPN'b)=CPN'OGOID4584(1,CPN'b)
|CPN'OGExecute1 (("ID4854",1),CPN'b)=CPN'OGOID4854(1,CPN'b)
|CPN'OGExecute1 (("ID4114",1),CPN'b)=CPN'OGOID4114(1,CPN'b)
|CPN'OGExecute1 (("ID3185",1),CPN'b)=CPN'OGOID3185(1,CPN'b)
|CPN'OGExecute1 (("ID3060",1),CPN'b)=CPN'OGOID3060(1,CPN'b)
|CPN'OGExecute1 CPN'x=CPN'OGExecute0 CPN'x;
val CPN'OGExecute=CPN'OGExecute1;
