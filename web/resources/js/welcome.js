var screenHeight;
var logoInitTop;

var animateOffset;
var noMember1 = 1;
var noMember2 = 1;
var noMember3 = 1;
var noMember4 = 1;
window.onload = function(){
    screenHeight = $('#coverage_back').height();
    animateOffset = screenHeight - 120;
    logoInitTop = document.getElementById('coverage_title').offsetTop;
    console.log("1111~"+logoInitTop);
    scrollMagic();
    $('#goto_wrapper').height(screenHeight - $('#team_members').height()+'px');
    console.log($('#team_name').height());
    console.log($('#goto_wrapper').height());
};

window.onscroll = function(){


//    console.log(logoInitTop+window.scrollY/2);
    $('#coverage_title').css({
        'position':'absolute',
        'top':logoInitTop+window.scrollY/2+'px'
    });

    //console.log(document.getElementById('member_1').offsetTop - window.scrollY);


    if(noMember1 && document.getElementById('member_1').offsetTop - window.scrollY < animateOffset ){
        noMember1 = 0;
        $('#member_1').css({'opacity':'1'});
        $('#photo1').addClass('bounceIn');
        $('#info1').addClass('fadeIn');
    }
    if(noMember2 && document.getElementById('member_2').offsetTop - window.scrollY < animateOffset ){
        noMember2 = 0;
        $('#member_2').css({'opacity':'1'});
        $('#photo2').addClass('bounceIn');
        $('#info2').addClass('fadeIn');
    }
    if(noMember3 && document.getElementById('member_3').offsetTop - window.scrollY < animateOffset ){
        noMember3 = 0;
        $('#member_3').css({'opacity':'1'});
        $('#photo3').addClass('bounceIn');
        $('#info3').addClass('fadeIn');
    }

    //console.log(document.getElementById('member_3').offsetTop - window.scrollY);
    //console.log(document.getElementById('member_4').offsetTop - window.scrollY);
    if(noMember4 && document.getElementById('member_4').offsetTop - window.scrollY < animateOffset ){
        noMember4 = 0;
//        console.log(111);
        $('#member_4').css({'opacity':'1'});
        $('#photo4').addClass('bounceIn');
        $('#info4').addClass('fadeIn');
    }


};

function scrollMagic(){
    var controller = new ScrollMagic.Controller();

    var logoChange = new ScrollMagic.Scene({
        triggerElement:'#coverage_title',
        triggerHook:'onLeave',
        duration:'10%',
        offset:-200
    }).addTo(controller)
        .setTween("#coverage_title",0.5,{opacity:0});

    //var pinIntro = new ScrollMagic.Scene({
    //    triggerElement:'#coverage_title',
    //    triggerHook:'onLeave',
    //    //duration:screenHeight+'px'
    //}).addTo(controller)
    //    .setPin("#brief_intro");

    var move1 = new ScrollMagic.Scene({
        triggerElement:'#move_trigger',
        triggerHook:'onEnter',
        duration:'100%'
        //offset:-100
    }).addTo(controller)
        .setTween(".brief_intro_item h2",1,{transform: 'translate(0,-310px)'});

    var move2 = new ScrollMagic.Scene({
        triggerElement:'#move_trigger',
        triggerHook:'onEnter',
        duration:'100%'
    }).addTo(controller)
        .setTween(".brief_intro_item_img",1,{transform: 'translate(0,-310px)'});


    var move3 = new ScrollMagic.Scene({
        triggerElement:'#move_trigger',
        triggerHook:'onEnter',
        duration:screenHeight/2+'px'
    }).addTo(controller)
        .setTween(".brief_intro_direction",1,{opacity:1,transform:'translate(0,-150px)',color:'#fff'});

    var team = new ScrollMagic.Scene({
        triggerElement:'#team_members',
        triggerHook:'onEnter',
        duration:'90%'
    }).addTo(controller)
        .setTween("#brief_intro",1,{opacity:0});

}
