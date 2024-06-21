


export class UpdateTodoDto {

    private constructor (
        public readonly id : number,
        public readonly text? :string,
        public readonly CompletedAt? : Date
    ){}

    get values(){
        const returnObj: {[key:string]: any} = {}

        if(this.text) returnObj.text = this.text
        if(this.CompletedAt) returnObj.completedAt = this.CompletedAt

        return returnObj
    }

    static create(props :{[key:string]: any}) : [string? , UpdateTodoDto?] {


        const {text , completedAt , id} = props;
        let newCompletedAt = completedAt

        if(!id || isNaN(Number(id))) {
            return ["id must be a valid number"]
        }

        if(completedAt){
             newCompletedAt = new Date(completedAt)
            if(newCompletedAt.toString() === "Invalid Date"){
                return ["CompletedAt must be a valid Date"]
            }
        } 

        if(!text) ["text property is required", undefined]

        return [undefined , new UpdateTodoDto(id ,text , newCompletedAt)]
    }

}