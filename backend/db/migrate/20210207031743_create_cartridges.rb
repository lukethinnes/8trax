class CreateCartridges < ActiveRecord::Migration[6.1]
  def change
    create_table :cartridges do |t|
      t.string :name
      t.string :image_url
      t.integer :year

      t.timestamps
    end
  end
end
