require 'csv'
require 'json'

namespace :db do
  desc "Fill database with caldwell objects"
  task caldwells: :environment do
    process_caldwell
  end
end

def process_caldwell

  acaldwells = []
  
  CSV.foreach("db/data/caldwells.csv", headers: true) do | row |
    c = row['c']
    tipo = row['Tipo']
    ra = (row['ra'].to_f/24*360).round(4)
    dec = row['dec'].to_f
    mag = row['mag'].to_f
    name = row['name']
    size = row['size']
    size = size.split('x')
    size = (size[0].to_f/60).round(4)
    ngc = row['ngc']
    constellation = row['con']
    
    # caldwell = Caldwell.new
    # caldwell.object = object
    # caldwell.tipo = tipo
    # caldwell.ra = ra
    # caldwell.dec = dec
    # caldwell.mag = mag
    # caldwell.name = name
    # caldwell.size = size
    # caldwell.ngc = ngc
    # caldwell.constellation = constellation
    # caldwell.detail = detail
    # caldwell.save!

    acaldwells.push({m: mag, s: size, co: [dec, ra]})
        
  end

  json = JSON.dump(acaldwells)
  File.open("public/data/caldwells.json", "w") { |f| f.write json }

  puts "Processed #{acaldwells.length} Caldwell objects"

  
end
