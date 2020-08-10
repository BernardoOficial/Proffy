const Database = require('./database/db')

const { subjects, weekdays, getSubjects, convertHoursToMinutes } = require('./utils/format')

function pageLanding(req, res) {
	return res.render("index.html");
}

async function pageStudy(req, res) {
	// Pegar as informações que foram passadas na URL do navagador
    const filters = req.query
    
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays }); 
    }

    // converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `

    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubjects(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }

}

function pageGiveClasses(req, res) {
	return res.render("give-classes.html", { subjects, weekdays });
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    console.log(proffyValue)

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    console.log(req.body.weekday)

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
    
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect('/study' + queryString) // Se tiver valor, vai redirecionar o cliente para a página de procurar professores.    
    } catch (error) {
        console.log(error)
    }
    
	// // Adicionar a lista de proffys
	// const naoEVazio = Object.keys(dados).length > 0 // Object.keys transforma as chaves do objetos em posições no array se ele tiverem algum conteúdo neles.
	// if(naoEVazio) {
	// 	console.log('Tem coisa aí')

	// 	data.subject = getSubjects(data.subject)

	// 	proffys.push(dados)	
    // }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}