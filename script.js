let videoGameSalesDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"

 let videoGameSalesData

let canvas = d3.select('#canvas')
let tooltip =d3.select('#tooltip')

let drawTreeMap = () => {
let hierarchy = d3.hierarchy(videoGameSalesData,(node) =>{
    return node['children']
}).sum((node)=>{
    return node['value']
}).sort((node1, node2) =>{
    return node2['value'] -node1['value']
})
let createTreeMap = d3.treemap()
       .size([1000, 600])

   createTreeMap(hierarchy)

   let gameTiles = hierarchy.leaves()
   console.log(gameTiles)

  let block = canvas.selectAll('g')
              .data(gameTiles)
              .enter()
              .append('g')
              .attr('transform', (game)=>{
                return 'translate(' + game['x0'] + ', ' + game['y0'] + ')'
              })

    block.append('rect')
         .attr('class' , 'tile')
         .attr('fill', (game) =>{
            let category = game['data']['category']
            if(category === "2600"){
                return 'orange'
              }else if(category === 'Wii'){
                return 'lightgreen'
              }else if(category === 'NES'){
                 return 'coral'
            }else if(category === 'GB'){
                return 'lightblue'
            }else if(category ==='DS'){
                return 'pink'
            }else if(category === 'X360'){
                return 'khaki'
            }else if(category ==='PS3'){
                return 'tan'
            }else if(category === 'PS2'){
                return 'green'
            }else if(category === 'SNES'){
                 return 'red'
            }else if(category === 'GBA'){
                return 'lavender'
            }else if(category === 'PS4'){
                return 'grey'
            }else if(category === '3DS'){
                return 'blue'
            }else if(category === 'N64'){
                return 'purple'
            }else if(category === 'PS'){
                return 'silver'

            }else if(category === 'XB'){
                return 'yellow'
            }else if(category === 'PC'){
                return 'turquoise'
            }else if(category === 'XOne'){
                return 'lightgrey'
            }else if(category === 'PSP'){
                return 'lightblue'
            }
         })
         .attr('data-name', (game)=>{
            return game['data']['name']
         })
         .attr('data-category',(game)=>{
            return game['data']['category']
         })
         .attr('data-value', (game)=>{
                    return game['data']['value']
         })
         .attr('width',(game)=>{
            return game['x1']- game['x0']
         })
         .attr('height',  (game)=>{
            return game['y1']-game['y0']
         })
         .on('mouseover', (game) =>{
            tooltip.transition()
            .style('visibility','visible')
            let revenue = game['data']['value']
            
            tooltip.html(
            '$' + revenue + '<hr />' + game['data']['name']
            )
            tooltip.attr('data-value', game['data']['value'])
         })
         .on('mouseout', (geme)=>{
            tooltip.transition()
            .style('visibility','hidden')

         })


         block.append('text')
         .text((game) =>{
            return game['data']['name']
         })
         .attr('x', 5)
         .attr('y', 20)
         }

d3.json(videoGameSalesDataUrl).then(
    (data, error)=> {
        if(error){
            console.log(error)
        }else{
            videoGameSalesData = data
            console.log(videoGameSalesData)
            drawTreeMap()
        }
    }
)

