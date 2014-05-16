require 'json'
require 'csv'

namespace :db do
    desc "Fill database with stars"
    task stars: :environment do
        process_stars
      end
  end

def process_stars

  colors = { }

  astars = []
  
  CSV.foreach("db/data/colors.csv", headers: true) do | row |
    type = row['type'].to_s
    rgb = row['rgb']
    colors[type] = rgb
  end

  CSV.foreach("db/data/hyg.csv", headers: true) do | row |

    id = row['StarID'].to_i
    ra = (row['RA'].to_f/24*360).round(4)
    dec = row['Dec'].to_f
    mag = row['Mag'].to_f
    name = row['ProperName']
    spec = row['Spectrum'].to_s.strip.upcase
    color = colors[spec]
    radius = ((1 / (mag.to_f+4+1.43))).round(4)*18


    if color.nil?
      color = "#ffffff"
    end

    if mag > 7
      next
    end


    astars.push({n: name, c: color, m: mag,  co: [dec,ra]})
    
    
  end
  json = JSON.dump(astars)
  File.open("public/data/stars.json", "w") { |f| f.write json }
  puts astars.length

end
