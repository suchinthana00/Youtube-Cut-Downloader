function timediff(t1,t2){
    let h1 = t1.substring(0,2);
    let h2 = t2.substring(0,2);
    let m1 = t1.substring(3,5);
    let m2 = t2.substring(3,5);
    let s1 = t1.substring(6);
    let s2 = t2.substring(6);

    let st = s1*1+m1*60+h1*3600;
    let ed = s2*1+m2*60+h2*3600;
    return(ed-st);
}

module.exports = timediff;