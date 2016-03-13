export default function ({ types: t }) {
    return {
        inherits: require("babel-plugin-syntax-monad-notation"),
        visitor: {
            MonadNotation: {
                enter(path) {
                    let body = path.node.body.slice(0);

                    let monadExp;
                    if (body.length == 1) {
                        monadExp = body[0].expr;
                    } else {
                        function createArgs(node) {
                            let thenArgs = [];
                            if (node.id !== null) {
                                thenArgs.push(node.id);
                            }
                            return thenArgs;
                        }

                        function createThenCall(node) {
                            let thenArgs = createArgs(node);
                            let thenReturn = t.returnStatement(t.identifier("deleteme"));
                            let thenBody = t.blockStatement([thenReturn]);
                            let thenFunction = t.functionExpression(null,
                                    thenArgs, thenBody);
                            let thenCall = t.callExpression(
                                    t.identifier("then"), [thenFunction]);
                            return [t.callExpression(
                                    t.memberExpression(node.expr, t.identifier("then")
                                        ), [thenFunction]), thenReturn];
                        }

                        let previousReturn;
                        for (let x = 0; x < body.length; x++) {
                            let node = body[x];
                            if (x == body.length-1) {
                                previousReturn.argument = node.expr;
                            } else {
                                let [callExpr, nextReturn] = createThenCall(node);
                                if (x == 0) {
                                    monadExp = callExpr;
                                } else {
                                    previousReturn.argument = callExpr;
                                }
                                previousReturn = nextReturn;
                            }

                        }
                    }

                    path.replaceWith(monadExp);
                }
            }
        }
    }
}
