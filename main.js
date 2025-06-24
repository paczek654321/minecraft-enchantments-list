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
			this.innerHTML = `<input type="checkbox" value="${name}" checked />`
			for (let i in list)
			{
				list[i] = list[i].trim()
				this.innerHTML += `<input type="radio" name="${name}" value="${list[i]}"${i == 0 ? " checked" : ""} />${list[i]}`
			}
			this.innerHTML += "<br />"
		}
	} customElements.define("enchantment-group", EnchantmentGroup)
})
function generate()
{
	let checked_groups = []
	let enchantments = {}
	for (let enchantment of document.querySelectorAll("input[type='checkbox']"))
	{
		if (enchantment.checked)
		{
			if (enchantment.parentElement.localName === "enchantment-group")
			{
				checked_groups.push(enchantment.value)
			}
			else
			{
				enchantments[enchantment.value] = (enchantments[enchantment.value] ? enchantments[enchantment.value] : 0) + 1
			}
		}
	}
	for (let enchantment of document.querySelectorAll("input[type='radio']"))
	{
		if (checked_groups.includes(enchantment.name) && enchantment.checked)
		{
			if (enchantment.value == "Riptide III")
			{
				enchantments[enchantment.value] = 1
				continue
			}
			enchantments[enchantment.value] = (enchantments[enchantment.value] ? enchantments[enchantment.value] : 0) + 1
		}
	}
	document.body.innerHTML = Object.entries(enchantments).map(([key, value])=>`${key}: ${value}`).join(`<br />`)
}