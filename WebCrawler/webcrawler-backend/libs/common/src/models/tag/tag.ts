import { ApiProperty } from '@nestjs/swagger';
import { TagEntity } from '../../entities/tag-entity/tag-entity';
import { IsNotEmpty, Max, MaxLength } from 'class-validator';

export class Tag {
  @ApiProperty()
  public id: number;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public static fromEntity(entity: TagEntity): Tag {
    const tag: Tag = new Tag(entity.id, entity.name);
    return tag;
  }
}
