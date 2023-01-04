const milestonesData = JSON.parse(data).data


// load course milestone data

function loadMilestones(mileStoneList,outputDiv) {
    const milestones = document.querySelector(outputDiv)
    milestones.innerHTML = `${mileStoneList
        .map(function(milestone) {
            return `<div class="milestone border-b" id = '${milestone._id}'>
                    <div class="flex">
                        <div class="checkbox">
                            <input type="checkbox" ${milestone.done ? 'checked' : ''} onclick ='markMilestone(this, ${milestone._id})'>
                        </div>
                        <div onclick = 'openMilestone(this, ${milestone._id})'>
                            <p>
                                ${milestone.name}
                                <span><i class=" fas fa-chevron-down"></i></span>
                            </p>
                        </div>
                    </div>
                    <div class="hidden_panel">
                        ${milestone.modules
                            .map(function(module) {
                                return `<div class="module border-b">
                                <p>${module.name}</p>
                            </div>`
                        }).join("")}
                    </div>
                </div>`
    }).join('')}`
}

function openMilestone(milestoneElements, id) {
    const currentPanel = milestoneElements.parentNode.nextElementSibling
    const showPanel = document.querySelector('.show')
    const active = document.querySelector('.active')

    if(!milestoneElements.classList.contains(active) && active)
    active.classList.remove('active')
    milestoneElements.classList.toggle('active')

    if(!currentPanel.classList.contains('show') && showPanel)
    showPanel.classList.remove('show')
    currentPanel.classList.toggle('show')

    showMileston(id)
}


function showMileston(id) {
    const milestoneImage = document.querySelector('.milestoneImage')
    const title = document.querySelector('.title')
    const details = document.querySelector('.details')

    milestoneImage.style.opacity = '0'
    milestoneImage.src = milestonesData[id].image
    title.innerText = milestonesData[id].name
    details.innerText = milestonesData[id].description
}


// listen for hero image load

const milestoneImage = document.querySelector('.milestoneImage')
milestoneImage.onload = function () {
    this.style.opacity = '1'
}

function markMilestone(checkbox, id) {

    // console.log(checkbox, id)

    //  get index of milestone
    const index = milestonesData.findIndex(function(milestone) {
         return milestone._id == id
    })
    milestonesData[index].done = checkbox.checked;


    // get all done milestones
    const doneMilestones = milestonesData.filter(function(milestone) {
        return milestone.done
    })

    // get all undone milestones
    const undoneMilestones = milestonesData.filter(function(milestone) {
        return !milestone.done
    })

    // render done milestones
    loadMilestones(doneMilestones, '.doneList')
    loadMilestones(undoneMilestones, '.milestones')
}

loadMilestones(milestonesData,'.milestones')
