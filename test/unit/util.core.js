describe('常用方法', function() {
    it('dataProcess（处理返回数据）', function() {
        var response = {
            "custom": {
                "infolist": [{
                    "title": "测试的title",
                    "date": "2017-01-22",
                    "guid": "131830"
                }]
            },
            "status": {
                "code": 200,
                "text": "成功",
                "url": ""
            }
        };

        expect(JSON.stringify(Util.dataProcess(response, {
            dataPath: 'custom.infolist'
        }).data)).to.be.equal(JSON.stringify(response.custom.infolist));
    });

});

describe('ajax相关', function() {
    var url,
        data;
    before(function() {
        // 在本区块的所有测试用例之前执行
        url = '//115.29.151.25:8012/request.php?action=testV7List';
        data = JSON.stringify({
                token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
                params: {
                    pageindex: 0,
                    pagesize: 10,
                    keyword: 'type1'
                }
        });
    });
    
    it('success（返回数据格式正确）', function(done) {
        Util.ajax({
            url: url,
            data: data,
            success: function(response) {
                expect(response.status.code).to.be.equal(200);
                expect(response.custom.infolist[0]).to.be.an('object');
                done();
            }
        });
    });

    it('then（promise用法）', function(done) {
        Util.ajax({
            url: url,
            data: data,
            error: null
        }).then(function(response) {
            expect(response.status.code).to.be.equal(200);
            expect(response.custom.infolist[0]).to.be.an('object');
            done();
        });
    });
});