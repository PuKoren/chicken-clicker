var actions = {
	0: {title: "Welcome to the industry", 
		message: "You are a young farmer, and took off your job to keep the familial farm going.<br/>You made a loan of 100,000$, and the bank leaves you 1 year to get the money back.<br/><br/>You can choose an activity each turn, on the left. Each activity costs dollars, and increase either your production rate or improve your production cost.<br/>Fix the sale price for your chicken, improve your production, do what you think is right.<br/>Once you are done, click on End Turn.", 
		actions:{
			0: {action: 0,
				message: "Roger",
				prodcost: 0,
				chickenout: 0,
				gold: 100000 }
		}
	},
	1: {title: "Setting the sale price", 
		message: "If your sale price is too high relative to the average sale price, you will sell a lot less.<br/>People are attentive to price more than bread conditions.<br/>In 2013, 74% of the chicken meat comes from intensive production. That means that 74% of the meat buyers don't care.<br/><br/>If you want to sell, drop your sale price. But be careful about your production cost, you may want to lower it by using upgrades on the left.", 
		actions:{
			0: {action: 0,
				message: "Roger",
				prodcost: 0,
				chickenout: 0,
				gold: 0 }
		}
	},
	2: {title: "Fighting the E. coli", 
		message: "According to Consumer Reports, 1.1 million or more Americans are sickened each year by undercooked, tainted chicken. A USDA study discovered E. coli (Biotype I) in 99% of supermarket chicken, the result of chicken butchering not being a sterile process.<br/>To help your consumers and avoid any issue, we can use irradiation after butchering. So this way the meat could be free of any virus for our consummers. But this has a cost, will you pay ?", 
		actions:{
			0: {action: 0,
				message: "Yes (40.000$)",
				prodcost: 0,
				chickenout: 0,
				gold: -40000 },
			1: {action: 0,
				message: "Nop (0$)",
				prodcost: 0,
				chickenout: 0,
				gold: 0 }
		}
	}
};