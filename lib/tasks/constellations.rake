#!/usr/bin/env ruby

require 'csv'
require 'json'

namespace :db do
  desc "Fill database with constellation lines"
  task constellations: :environment do
    process_constellations
  end
end


def process_constellations

  aconsts = []


  CSV.foreach("db/data/constellations.csv", headers: true) do | row, i |
    name = row['name']

    slo = (row['sra'].to_f/24*360).round(3)
    sla = row['slat'].to_f.round(3)
    elo = (row['era'].to_f/24*360).round(3)
    ela = row['elat'].to_f.round(3)

    aconsts.push({n: name, s: [sla, slo], e: [ela, elo]})

  end

  json = JSON.dump(aconsts)
  File.open("public/data/constellations.json", "w") { |f| f.write json }

  puts "Processed #{aconsts.length} Constellation lines"


end
