document.addEventListener('DOMContentLoaded', function()
{
	class CommonList extends HTMLElement
	{
		constructor()
		{
			super()
		}
		connectedCallback()
		{
			this.innerHTML = document.getElementById(this.innerHTML).innerHTML
		}
	} customElements.define("common-list", CommonList)

	class EnchantmentLabel extends HTMLElement
	{
		constructor()
		{
			super()
		}
		connectedCallback()
		{
			this.innerHTML = `<input type="checkbox" value="${this.innerHTML}" checked />${this.innerHTML}<br />`
		}
	} customElements.define("enchantment-label", EnchantmentLabel)

	class EnchantmentGroup extends HTMLElement
	{
		constructor()
		{
			super()
		}
		connectedCallback()
		{
			let name = Math.random().toString(36).substring(2, 18)
			let list = this.innerHTML.trim().split(";")
			if (list[list.length-1].trim() == "") {list.pop()}
			this.innerHTML = `<input type="checkbox" id="group_checkobx_${name}" checked />`
			for (let i in list)
			{
				list[i] = list[i].trim()
				this.innerHTML += `<input type="radio" name="${name}" value="${list[i]}"${i == 0 ? " checked" : ""} />${list[i]}`
			}
			this.innerHTML += "<br />"
		}
	} customElements.define("enchantment-group", EnchantmentGroup)
	
	class EnchantmentListGroup extends HTMLElement
	{
		constructor()
		{
			super()
		}
		connectedCallback()
		{
			let name = Math.random().toString(36).substring(2, 18)

			let list = this.innerHTML.trim().split(";")
			if (list[list.length-1].trim() == "") {list.pop()}

			let group = 0
			this.innerHTML = `<input type="radio" name="${name}" id="group_list_radio_${name}_0" checked />`
			
			for (let i in list)
			{
				list[i] = list[i].trim()
				if (list[i] == "-")
				{
					group++
					this.innerHTML += `<br /><input type="radio" name="${name}" id="group_list_radio_${name}_${group}" />`
					continue
				}
				this.innerHTML += `<input type="checkbox" value="${list[i]}" name="${name}_${group}" checked />${list[i]}`
			}

			this.innerHTML += "<br />"
		}
	} customElements.define("enchantment-list-group", EnchantmentListGroup)
})


function generate()
{
	let enchantments = {}
	function increment(name)
	{
		enchantments[name] = (enchantments[name] ?? 0) + 1
	}

	for (let enchantment of document.querySelectorAll("enchantment-label input[type='checkbox']"))
	{
		if (enchantment.checked) { increment(enchantment.value) }
	}

	for (let enchantment of document.querySelectorAll("enchantment-group input[type='radio']"))
	{
		if (enchantment.checked && document.getElementById(`group_checkobx_${enchantment.name}`).checked) { increment(enchantment.value) }
	}

	for (let enchantment of document.querySelectorAll("enchantment-list-group input[type='checkbox']"))
	{
		if (enchantment.checked && document.getElementById(`group_list_radio_${enchantment.name}`).checked) { increment(enchantment.value) }
	}
	document.body.innerHTML = Object.entries(enchantments).map(([key, value])=>`${key}: ${value}`).join(`<br />`)
}