require 'csv'
require 'json'

namespace :db do
  desc "Fill database with messier objects"
  task messiers: :environment do
    process_messier
  end
end

def process_messier

  amessiers = []
  
  CSV.foreach("db/data/messiers.csv", headers: true) do | row |
    object = row['Object']
    tipo = row['Tipo']
    ra = (row['RA'].to_f/24*360).round(4)
    dec = row['DEC'].to_f
    mag = row['Magnitude'].to_f
    name = row['Name']
    size = (row['Size'].to_f/60).round(4)
    ngc = row['ngc']
    constellation = row['Constellation']
    detail = row['detail']
    
    # messier = Messier.new
    # messier.object = object
    # messier.tipo = tipo
    # messier.ra = ra
    # messier.dec = dec
    # messier.mag = mag
    # messier.name = name
    # messier.size = size
    # messier.ngc = ngc
    # messier.constellation = constellation
    # messier.detail = detail
    # messier.save!

    amessiers.push({m: mag, s: size, co: [dec, ra]})
        
  end

  json = JSON.dump(amessiers)
  File.open("public/data/messiers.json", "w") { |f| f.write json }

  puts "Processed #{amessiers.length} Messier objects"

  
end
